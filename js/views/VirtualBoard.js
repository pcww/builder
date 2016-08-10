import Backbone from 'backbone'
import THREE from 'three.js'
window.THREE = THREE
require('three/controls/OrbitControls')





let sizes = {
  small: 0.25,
  xsmall: 0.375,
  small: 0.5,
  medium: 0.625,
  large: 1
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
      alpha: true
    })
    this.resize()

    this.materials = {}
    this.boxDimension = 100
    this.boxGeometry = new THREE.BoxGeometry(this.boxDimension * 5, this.boxDimension, this.boxDimension / 2)
    this.far = 10000
    this.fov = 45
    this.near = 0.1

    this.scene = new THREE.Scene
    this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far)
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

    this.camera.position.z = 1000
    this.camera.position.x = -500
    this.camera.position.y = 1000
    this.camera.lookAt(0, 0, 0)

    // Limit zooming (keeping in mind near/far camera planes)
    this.controls.maxDistance = 9500
    this.controls.minDistance = 1000

    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25


    this.renderer.setClearColor('white', 1)
    // this.renderer.setSize(width, height)
    // this.renderer.setClearColor('transparent', 1)

    this.scene.add(this.camera)

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
            map: new THREE.TextureLoader().load(`/assets/woods/${strip.get('wood')}.jpg`)
          })
        }

        let dimensions = {
          x: this.board.get('width') * this.boxDimension,
          y: 1 * this.boxDimension,
          z: sizes[strip.get('size')] * this.boxDimension
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

        currentZ += dimensions.z

        this.scene.add(mesh)

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
