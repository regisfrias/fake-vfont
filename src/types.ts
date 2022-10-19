export interface TextBoxType {
  text: string
  fontSize: number
  width: number
  height: number
}

interface Bulge {
  on: boolean
  center: number
}

export interface ControlsType {
  thickness: number
  bulge: {
    x: Bulge
    y: Bulge
  }
}
