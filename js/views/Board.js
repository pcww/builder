import Backbone from 'backbone'
import THREE from 'three.js'
window.THREE = THREE
require('three/controls/OrbitControls')





export default class Board {

  /******************************************************************************\
    Public Methods
  \******************************************************************************/

  constructor (data) {
    this.data = data
    this.el = document.querySelector('main')
    this.height = this.el.offsetHeight
    this.materials = {}
    this.width = this.el.offsetWidth

    this.boxDimension = 100
    this.boxGeometry = new THREE.BoxGeometry(this.boxDimension * 5, this.boxDimension, this.boxDimension / 2)
    this.far = 10000
    this.fov = 45
    this.near = 0.1

    this.scene = new THREE.Scene
    this.camera = new THREE.PerspectiveCamera(this.fov, this.width / this.height, this.near, this.far)
    this.renderer = new THREE.WebGLRenderer
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

    this.camera.position.z = 1000
    this.camera.position.x = -500
    this.camera.position.y = 500
    this.camera.lookAt(0, 0, 0)

    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25

    this.renderer.setSize(this.width, this.height)
    this.renderer.setClearColor('white', 1)

    this.scene.add(this.camera)

    this.render()
  }

  render () {
    for (let i = 0; i < this.data.strips.length; i++) {
      let strip = this.data.strips[i]

      let boxMaterial = this.materials[strip.wood] = this.materials[strip.wood] ? this.materials[strip.wood] : new THREE.MeshLambertMaterial({
        map: new THREE.TextureLoader().load(`/assets/woods/${strip.wood}.jpg`)
      })

      let box = new THREE.Mesh(this.boxGeometry, boxMaterial)

      box.position[this.direction === 'h' ? 'x' : 'z'] = ((this.boxDimension / 2) * i) - (Math.round(this.data.strips.length / 2) * (this.boxDimension / 2))

      this.scene.add(box)
    }

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
}
