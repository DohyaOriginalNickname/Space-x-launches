export default function (event, ref, column) {
    event.preventDefault()
    if (ref === 1) {
        column[ref].style.backgroundColor = 'red'
    }else{
        column[ref].style.backgroundColor = 'green'
    }
}