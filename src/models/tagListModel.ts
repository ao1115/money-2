import createId from '../lib/createId';
const localStorageName = 'tagList'
//将name作为id
type Tag = {
    id: string,
    name: string
}
type TagListModel = {
    data: Tag[]
    fetch: () => Tag[]
    create: (name: string) => 'duplicated' | 'success'//success表示成功 duplicated表示失败.。联合类型
    update: (id: string, name: string) => 'duplicated' | 'success' | 'not-found'
    remove: (id: string) => boolean
    save: () => void
}
const tagListModel: TagListModel = {
    //得到初始化数据
    data: [],
    fetch() {
        this.data = JSON.parse(
            window.localStorage.getItem(localStorageName) || "[]");
        return this.data
    },
    create(name) {
        //这个时候data是个对象  {"id":"1","name":"1";"id":"2","name":"2"}
        //没有办法直接this.data.indexOf(name)这样取到
        //先把所有的name保存到names里面
        const names = this.data.map(item => item.name)
        const id = createId().toString()
        if (names.indexOf(name) >= 0) { return 'duplicated'; }
        this.data.push({ id, name: name });
        this.save();
        return 'success';
    },
    //更新标签名
    update(id: string, name: string) {
        //获取所有的id
        const idList = this.data.map(item => item.id)
        if (idList.indexOf(id) >= 0) {
            //如果有这个id，那就获取所有的name
            const names = this.data.map(item => item.name)
            if (names.indexOf(name) >= 0) {
                return 'duplicated'
            } else {
                const tag = this.data.filter(item => item.id === id)[0]
                tag.name = name
                tag.id = name //将id和name保持一致
                this.save()
                return 'success'
            }
        } else {
            return 'not-found'
        }
    },
    //删除标签名
    remove(id: string) {
        let index = -1
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id === id) {
                index = i
                break;
            }
        }
        this.data.splice(index, 1)
        this.save() //必须要保存
        return true
    },
    //保存数据
    save() {
        window.localStorage.setItem(localStorageName, JSON.stringify(this.data));
    }
}
export default tagListModel