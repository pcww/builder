import '../scss/app.scss'

import THREE from 'three.js'
import React from 'react'
import ReactDOM from 'react-dom'

import BoardDataModel from './boardDataModel.json'

window.onload = function () {
  let height = window.innerHeight
  let width = window.innerWidth
  let fov = 45
  let aspect = width / height
  let near = 0.1
  let far = 10000

  let renderer = new THREE.WebGLRenderer
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  let scene = new THREE.Scene

  scene.add(camera)

  camera.position.z = 1000

  renderer.setSize(width, height)

  document.querySelector('body').appendChild(renderer.domElement)

  let radius = 50
  let segments = 16
  let rings = 16

  let boxDimension = 100
  let boxGeometry = new THREE.BoxGeometry(boxDimension * 5, boxDimension, boxDimension / 2)
  let materials = {}

  for (let i = 0; i < BoardDataModel.strips.length; i++) {
    let strip = BoardDataModel.strips[i]

    let boxMaterial = materials[strip.wood] = materials[strip.wood] ? materials[strip.wood] : new THREE.MeshLambertMaterial({
      map: new THREE.TextureLoader().load(`/assets/woods/${strip.wood}.jpg`)
    })

    let box = new THREE.Mesh(boxGeometry, boxMaterial)

    box.position.z = ((boxDimension / 2) * i) - (Math.round(BoardDataModel.strips.length / 2) * (boxDimension / 2))

    scene.add(box)
  }

  camera.position.x = -500
  camera.position.y = 500
  camera.lookAt(0, 0, 0)

  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
//  controls.enableZoom = false

  let light0 = new THREE.DirectionalLight('white')
  light0.position.set(1, 1, 1)
  scene.add(light0)

  let light1 = new THREE.DirectionalLight(0x002288)
  light1.position.set(-1, -1, -1)
  scene.add(light1)

  scene.add(new THREE.AmbientLight('white'))

  renderer.setClearColor('white', 1)
  renderer.render(scene, camera)

  let render = function () {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  render()
}
