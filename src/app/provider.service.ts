import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { Socket } from 'ngx-socket-io'
import { Conf } from './conf/conf'

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private socket: Socket) {
    this.socket.connect()
}

read(collection, queries) {
    return Observable.create(observer => {
        let data = {
            collection: collection,
            queries: queries
        }
        this.socket.emit('read', data, (documents) => {
            observer.next(documents)
            observer.complete()
        })
    })
}
delete(collection, item) {
    return Observable.create(observer => {
        let data = {
            collection: collection,
            item: item
        }
        console.log(data)
        this.socket.emit('delete', data, (_id) => {
            observer.next(_id)
            observer.complete()
        })
    })
}

update(collection, item) {
    return Observable.create(observer => {
        let data = {
            collection: collection,
            query: {
                _id: item._id
            },
            item: item
        }
        this.socket.emit('update', data, (updated) => {
            observer.next(updated)
            observer.complete()
        })
    })
}
create(collection, item) {
    return Observable.create(observer => {
        let data = {
            collection: collection,
            item: item
        }
        this.socket.emit('create', data, (_id) => {
            observer.next(_id)
            observer.complete()
        })
    })
}
createDate(collection, item) {
    return Observable.create(observer => {
        let data = {
            collection: collection,
            item: item
        }
        this.socket.emit('createDate', data, (_id) => {
            observer.next(_id)
            observer.complete()
        })
    })
}
readOne(collection, queries) {
    return Observable.create(observer => {
        let data = {
            collection: collection,
            queries: queries
        }
        this.socket.emit('read_one', data, (document) => {
            observer.next(document)
            observer.complete()
        })
    })
}

readDatetime() {
    return Observable.create(observer => {
        this.socket.emit('read_datetime', {}, (datetime) => {
            observer.next(datetime)
            observer.complete()
        })
    })
}


getOriginPath()  {
    let server = Conf.Server
    return server.protocol + '://' + server.host + ':' + server.port + '/'
}

submit(path) {
    let server = Conf.Server

    let form = document.createElement("form")
    form.action = server.protocol+'://'+server.host+':'+server.port+'/'+path
    form.method = 'GET'
    form.target = '_blank'
    form.style.display = 'none'
    document.body.appendChild(form)
    form.submit()
}

notify(message) {
    // return Observable.create(observer => {
    //     let data = {
    //         token: Conf.token,
    //         message: message
    //     }
    //     this.socket.emit('notify', data, (notified) => {
    //         observer.next(notified)
    //         observer.complete()
    //     })
    // })
}
}