import * as types from './types'

export const widgetMove = (id, x, y) => {
  return { type: types.WidgetMove, data: { id, x, y } }
}

export const widgetAdd = (x, y) => {
  return { type: types.WidgetAdd, data: { x, y } }
}

export const widgetDragEnd = (id) => {
  return { type: types.WidgetDragEnd, data: { id } }
}

export const widgetToggleMove = (id) => {
  return { type: types.WidgetToggleMove, data: { id } }
}

export const widgetSetMove = (id, value) => {
  return { type: types.WidgetSetMove, data: { id, value } }
}

export const widgetDeleteSelected = () => {
  return { type: types.WidgetDeleteSelected }
}

export const unselectAll = (id) => {
  return { type: types.UnselectAll, data: { id } }
}

export const scroll = (dx, dy) => {
  return { type: types.Scroll, data: { dx, dy } }
}
