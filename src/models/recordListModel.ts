import clone from "@/lib/clone"

const localStorageName = 'recordList'
const recordListModel = {
    //得到初始化数据
    data: [] as RecordItem[],
    fetch() {
        this.data = JSON.parse(
            window.localStorage.getItem(localStorageName) || "[]"
        )
        return this.data
    },

    create(record: RecordItem) {
        //不能直接将this.record传给recordList。这样每次更新的值都是最新的值，应该把值深拷贝一份再传
        const record2: RecordItem = clone(record)
        record2.createdAt = new Date().toISOString();
        this.data.push(record2);
        this.save()
        console.log(this.data);
    },
    //保存数据
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));

    }
}
export default recordListModel