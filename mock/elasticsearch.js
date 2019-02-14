export const fakeResult = {
    "took": 4,
    "timed_out": false,
    "_shards": {
      "total": 5,
      "successful": 5,
      "skipped": 0,
      "failed": 0
    },
    "hits": {
      "total": 10,
      "max_score": 1,
      "hits": [
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "10",
          "_score": 1,
          "_source": {
            "user": "user5",
            "sitecode": 9014,
            "timestamp": "2019-04-11",
            "ip_addr": "192.168.70.201"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "9",
          "_score": 1,
          "_source": {
            "user": "user4",
            "sitecode": 9052,
            "timestamp": "2019-03-01",
            "ip_addr": "192.168.4.20"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "5",
          "_score": 1,
          "_source": {
            "user": "user5",
            "sitecode": 9052,
            "timestamp": "2019-01-01",
            "ip_addr": "10.4.0.25"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "8",
          "_score": 1,
          "_source": {
            "user": "user3",
            "sitecode": 9220,
            "timestamp": "2018-02-01",
            "ip_addr": "10.4.4.70"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "4",
          "_score": 1,
          "_source": {
            "user": "user4",
            "sitecode": 9052,
            "timestamp": "2019-06-11",
            "ip_addr": "192.168.120.50"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "2",
          "_score": 1,
          "_source": {
            "user": "user2",
            "sitecode": 9145,
            "timestamp": "2019-05-01",
            "ip_addr": "192.168.11.1"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "6",
          "_score": 1,
          "_source": {
            "user": "user1",
            "sitecode": 9014,
            "timestamp": "2019-07-24",
            "ip_addr": "10.10.200.5"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "7",
          "_score": 1,
          "_source": {
            "user": "user2",
            "sitecode": 9220,
            "timestamp": "2019-09-03",
            "ip_addr": "172.16.40.204"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "1",
          "_score": 1,
          "_source": {
            "user": "user1",
            "sitecode": 9014,
            "timestamp": "2019-08-01",
            "ip_addr": "10.0.0.1"
          }
        },
        {
          "_index": "wod",
          "_type": "_doc",
          "_id": "3",
          "_score": 1,
          "_source": {
            "user": "user3",
            "sitecode": 9220,
            "timestamp": "2020-02-01",
            "ip_addr": "172.16.31.1"
          }
        }
      ]
    }
  }

var isError = false;

export class FakeElasticSearch {
	
	constructor(isError){
		this.isError = isError || false;
	}

	ping(opts, cb){

		if(this.isError){
			cb(new Error('elasticsearch cluster is down!'))
		}
		else{
			cb();
		}

	}

	search(opts) {
		return Promise.resolve(fakeResult);
	}
	
}
export const fakeElasticSearch = new FakeElasticSearch();