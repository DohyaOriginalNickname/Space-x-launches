export default function (ref, column) {
    if(column[ref].style.backgroundColor === 'red' || column[ref].style.backgroundColor === 'green'){
        column[ref].style.backgroundColor = ''
    }
}    