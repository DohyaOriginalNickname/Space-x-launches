export default function (snackbar){
    snackbar.className = 'snackbar show'
    setTimeout(()=>{ snackbar.className = 'snackbar'}, 2000)
}