export interface TextBoxType {
  text: string
  fontSize: number
  width: number
  height: number
}

export interface ControlsType {
  thickness: number
  bulge: {
    x: boolean
    y: boolean
  },
  radius: {
    x: number
    y: number
  },
  debug: boolean
  compensateWidth: boolean
}
