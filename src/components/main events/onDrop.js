import showSnacbar from "../accessory events/showSnacbar"
import showModalWindow from "../accessory events/showModalWindow"

export default function (event, categoryId, items, column, snackbar) {
    const itemId = parseInt(event.dataTransfer.getData('itemId'))
    items= items.map(item => {
        if (categoryId === 1 && item.categoryId !== 1){
            column[categoryId].style.backgroundColor = ''
            return item
        }
        if(item.id === itemId){
            column[categoryId].style.backgroundColor = ''
            if (categoryId === 2) {
            if(showModalWindow() === true){
                item.categoryId = categoryId
            }else{
                return item
            }
            }else{
                item.categoryId = categoryId
                showSnacbar(snackbar)
            }
        }
        return item
    })
}