import Constants from 'expo-constants'

class MapboxGL {
  public static ins: any

  static config = () => {
    if (Constants.appOwnership !== 'expo') {
      const Mapbox = require('@rnmapbox/maps').default
      Mapbox.setAccessToken(
        'pk.eyJ1IjoidHVhbmtpZXRjb2RlciIsImEiOiJjbGVzaWV2ZGYwNHQ1NDFwZnFpeXFvNzk3In0.r1ZaEFky45s3hjk2QYIMdg'
      )
      this.ins = Mapbox
    } else {
      this.ins = undefined
    }
  }
}

export default MapboxGL
