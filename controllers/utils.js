

const transform = (loc) => loc.slice(7).slice(0, -1).split(',')

function geoToArr(obj) {
    if (obj && obj.lat && obj.lng) {
        return [obj.lat, obj.lng]
    } else {
        return null
    }
}


export { transform, geoToArr }