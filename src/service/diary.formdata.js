import {
    getDetailTime
} from './date.filter'

export const formDate = list => list.map(diary => {
    diary.date = getDetailTime(diary.date)
    diary.cover = diary.img.src;
    return diary
})