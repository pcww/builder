import Backbone from 'backbone'
import THREE from 'three.js'
window.THREE = THREE
require('three/controls/OrbitControls')





let sizes = {
  xxsmall: 0.25,
  xsmall: 0.375,
  small: 0.5,
  medium: 0.625,
  large: 1
}





function buildAxes( length ) {
  var axes = new THREE.Object3D();

  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
  axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

  return axes;
}

function buildAxis( src, dst, colorHex, dashed ) {
  var geom = new THREE.Geometry(),
      mat;

  if(dashed) {
    mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
  } else {
    mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
  }

  geom.vertices.push( src.clone() );
  geom.vertices.push( dst.clone() );
  geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

  var axis = new THREE.Line( geom, mat, THREE.LinePieces );

  return axis;
}





export default class VirtualBoard {

  /******************************************************************************\
    Private Methods
  \******************************************************************************/

  _bindEvents () {
    window.addEventListener('resize', this.resize.bind(this))
  }





  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (BoardModel, container) {
    this.board = BoardModel

    BoardModel.on('change', () => {
      this.board = BoardModel
    })

    this.container = container

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    })
    this.resize()

    this.materials = {}
    this.far = 10000
    this.fov = 45
    this.near = 0.1

    this.mesh = new THREE.Object3D
    this.scene = new THREE.Scene
    this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far)
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

    this.camera.position.z = 100
    this.camera.position.x = -50
    this.camera.position.y = 100
    this.camera.lookAt(0, 0, 0)

    // Limit zooming (keeping in mind near/far camera planes)
    this.controls.maxDistance = 9500
    this.controls.minDistance = 10

    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25

    this.renderer.setClearColor('white', 1)

    if (!!window.debug) {
      this.scene.add(buildAxes(1000))
    }

    this.scene.add(this.mesh)
    this.scene.add(this.camera)

    window.mesh = this.mesh

    this.render()
    this._bindEvents()
  }

  resize () {
    this.el = document.querySelector(this.container)
    this.height = this.el.offsetHeight
    this.width = this.el.offsetWidth

    if (this.camera) {
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.setSize(this.width, this.height);
  }

  render () {
    let strips = this.board.get('strips')
    let currentZ = 0

    strips.forEach((strip, index, collection) => {
      if (!strip.get('rendered')) {
        let boxMaterial

        if (this.materials[strip.get('wood')]) {
          boxMaterial = this.materials[strip.get('wood')]

        } else {
          boxMaterial = this.materials[strip.get('wood')] = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load(`/assets/woods/${strip.get('wood')}.jpg`),
            wireframe: !!window.debug
          })
        }

        let dimensions = {
          x: this.board.get('width'),
          y: 1,
          z: sizes[strip.get('size')]
        }

        if (index > 0) {
          currentZ += (dimensions.z / 2)
        }

        let geometry = new THREE.BoxGeometry(dimensions.x, dimensions.y, dimensions.z)
        let mesh

        if (strip.get('mesh')) {
          mesh = strip.get('mesh')
          mesh.geometry = geometry

        } else {
          mesh = new THREE.Mesh(geometry, boxMaterial)
          strip.set('mesh', mesh)
        }

        mesh.position.z = currentZ

        currentZ += (dimensions.z / 2)

        this.mesh.add(mesh)

        let boardWidth = 0

        this.mesh.children.forEach(strip => {
          boardWidth += strip.geometry.parameters.depth
        })

        this.mesh.position.z = -(boardWidth / 2)

        strip.set('rendered', true)
      }
    })

    this.controls.update()
    this.renderer.render(this.scene, this.camera)

    if (!this.rendered) {
      this.rendered = true

      this.scene.add(new THREE.AmbientLight('white'))

      this.el.appendChild(this.renderer.domElement)
    }

    requestAnimationFrame(this.render.bind(this))
  }
}