const localStorageName = 'recordList'
const model = {
    //得到初始化数据
    fetch() {
        return JSON.parse(
            window.localStorage.getItem(localStorageName) || "[]"
        ) as RecordItem[];
    },
    clone(data: RecordItem | RecordItem[]) {
        JSON.parse(JSON.stringify(data))
    },
    //保存数据
    save(data: RecordItem[]) {
        window.localStorage.setItem(localStorageName, JSON.stringify(data));

    }
}
export default model