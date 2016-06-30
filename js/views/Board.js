import Backbone from 'backbone'
import THREE from 'three.js'
window.THREE = THREE
require('three/controls/OrbitControls')





export default class Board {

  _bindEvents () {
    window.addEventListener('resize', this.resize.bind(this))
  }

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (data) {
    this.data = data
    this.el = document.querySelector('main')
    this.materials = {}

    let height = this.el.offsetHeight
    let width = this.el.offsetWidth

    this.boxDimension = 100
    this.boxGeometry = new THREE.BoxGeometry(this.boxDimension * 5, this.boxDimension, this.boxDimension / 2)
    this.far = 10000
    this.fov = 45
    this.near = 0.1

    this.scene = new THREE.Scene
    this.camera = new THREE.PerspectiveCamera(this.fov, width / height, this.near, this.far)
    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    })
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

    this.camera.position.z = 1000
    this.camera.position.x = -500
    this.camera.position.y = 500
    this.camera.lookAt(0, 0, 0)

    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25

    this.renderer.setSize(width, height)
//    this.renderer.setClearColor('transparent', 1)

    this.scene.add(this.camera)

    this.strips = new Backbone.Collection(data.strips)

    this.render()
    this._bindEvents()
  }

  render () {
    this.strips.forEach((strip, index, collection) => {
      if (!strip.get('rendered')) {
        let boxMaterial

        if (this.materials[strip.get('wood')]) {
          boxMaterial = this.materials[strip.get('wood')]

        } else {
          boxMaterial = this.materials[strip.get('wood')] = new THREE.MeshLambertMaterial({
            map: new THREE.TextureLoader().load(`/assets/woods/${strip.get('wood')}.jpg`)
          })
        }

        strip.set('object', new THREE.Mesh(this.boxGeometry, boxMaterial))

        let box = strip.get('object')

        box.position[this.direction === 'h' ? 'x' : 'z'] = ((this.boxDimension / 2) * index) - (Math.round(this.data.strips.length / 2) * (this.boxDimension / 2))

        this.scene.add(box)

        strip.set('rendered', true)
      }
    })

    this.controls.update()
    this.renderer.render(this.scene, this.camera)

    if (!this.rendered) {
      console.log('Rendering!')
      this.rendered = true

      this.scene.add(new THREE.AmbientLight('white'))

      this.el.appendChild(this.renderer.domElement)
    }

    requestAnimationFrame(this.render.bind(this))
  }

  resize () {
    let height = this.el.offsetHeight
    let width = this.el.offsetWidth

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()

    this.renderer.setSize(width, height)
  }
}
