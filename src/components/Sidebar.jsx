import React from 'react'
import { withStore } from 'fluorine-lib'
import { Link } from 'react-router'

import {
  decoding
} from 'pipboylib'

import Database from '../stores/Database'
import dispatcher from '../dispatcher'

const { generateTreeFromDatabase } = decoding

@withStore(dispatcher
  .reduce(Database)
  .map(x => generateTreeFromDatabase(x))
  .filter(x => x && x.Status)
  .map(x => x.Status.EffectColor)
  .map(effectColor => {
    let effectColors = effectColor.map(x => Math.round(x*255) )
    let effect = {
      red: effectColors[0],
      green: effectColors[1],
      blue: effectColors[2]
    }
    return `rgb(${effect.red},${effect.green},${effect.blue})`
  })
  .distinctUntilChanged(),
  'color')
export default class Sidebar extends React.Component {
  render() {
    const styles = {
      container: {
        height: '100%',
        width: 200,
        padding: 10,
        color: this.props.color
      },
      sidebar: {
        borderRight: `3px solid ${this.props.color}`,
        height: '100%',
        width: '100%'
      }
    }

    return (
      <div style={styles.container}>
        <div style={styles.sidebar}>
          <ul>
            <li><Link to="/map">Map</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
