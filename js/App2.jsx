import THREE from 'three.js'
import React from 'react'
import ReactDOM from 'react-dom'

import BoardDataModel from './boardDataModel.json'

window.onload = function () {
  let height = 300
  let width = 400
  let fov = 45
  let aspect = width / height
  let near = 0.1
  let far = 10000

  let renderer = new THREE.WebGLRenderer
  let camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

  let scene = new THREE.Scene

  scene.add(camera)

  camera.position.z = 300

  renderer.setSize(width, height)

  document.querySelector('body').appendChild(renderer.domElement)

  let radius = 50
  let segments = 16
  let rings = 16

  let boxDimension = 100
  let boxGeometry = new THREE.BoxGeometry(boxDimension, boxDimension, boxDimension * 2)
  let boxMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000})
  let box = new THREE.Mesh(boxGeometry, boxMaterial)

  camera.position.x = -500
  camera.position.y = 500
  camera.lookAt(box.position)

  let controls = new THREE.OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.25
  controls.enableZoom = false

  scene.add(box)

  let light0 = new THREE.DirectionalLight(0xffffff)
  light0.position.set(1, 1, 1)
  scene.add(light0)

  let light1 = new THREE.DirectionalLight(0x002288)
  light1.position.set(-1, -1, -1)
  scene.add(light1)

  scene.add(new THREE.AmbientLight(0xFFFFFF))

  renderer.setClearColor(0xdddddd, 1)
  renderer.render(scene, camera)

  let render = function () {
    controls.update()
    renderer.render(scene, camera)
    requestAnimationFrame(render)
  }

  render()
}
