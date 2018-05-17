module.exports = {
    "products": {
        //查询列表
        "getProductList": function (req, res) {
            res.send(
                {
                    "total": 100,
                    "page": 2,
                    "pageSize": 20,
                    "data": [
                        {
                            "num_iid": "10010",
                            "title": "title:1001",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "outerId":123456,
                            "tags":[
                                {
                                    tagId:1,
                                    tagName:"ssss",
                                    tagDescribe:"备注"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },{
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                }

                            ],
                            "skuSize":4,
                            "skus": [
                                {
                                    "skuId": "sku:04",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "20码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "26码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:02",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "24码"
                                        }
                                    ]
                                }
                                ,
                                {
                                    "skuId": "sku:03",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "23码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10012",
                            "title": "title:1002",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":4,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ],
                            "tags":[
                                {
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                },
                                {
                                    tagId:5,
                                    tagName:"标签5"
                                },
                                {
                                    tagId:6,
                                    tagName:"标签6"
                                },
                                {
                                    tagId:7,
                                    tagName:"标签7"
                                },
                                {
                                    tagId:8,
                                    tagName:"标签8"
                                },
                                {
                                    tagId:9,
                                    tagName:"标签9"
                                },
                                {
                                    tagId:10,
                                    tagName:"标签10"
                                },
                                {
                                    tagId:6,
                                    tagName:"标签6"
                                },
                                {
                                    tagId:7,
                                    tagName:"标签7"
                                },
                                {
                                    tagId:8,
                                    tagName:"标签8"
                                },
                                {
                                    tagId:9,
                                    tagName:"标签9"
                                },
                                {
                                    tagId:10,
                                    tagName:"标签10"
                                },
                                {
                                    tagId:6,
                                    tagName:"标签6"
                                },
                                {
                                    tagId:7,
                                    tagName:"标签7"
                                },
                                {
                                    tagId:8,
                                    tagName:"标签8"
                                },
                                {
                                    tagId:9,
                                    tagName:"标签9"
                                },
                                {
                                    tagId:10,
                                    tagName:"标签10"
                                },
                                {
                                    tagId:6,
                                    tagName:"标签6"
                                },
                                {
                                    tagId:7,
                                    tagName:"标签7"
                                },
                                {
                                    tagId:8,
                                    tagName:"标签8"
                                }
                            ]
                        },
                        {
                            "num_iid": "10013",
                            "title": "title:1003",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":4,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ],
                            "tags":[
                                {
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                }
                            ]
                        },
                        {
                            "num_iid": "10014",
                            "title": "title:1004",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":4,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ],
                            "tags":[
                                {
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                }
                            ]
                        },
                        {
                            "num_iid": "10015",
                            "title": "title:1005",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":0,
                            "outerId":123456,
                            "skus": [
                            ],
                            "tags":[
                                {
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                }
                            ]
                        },
                        {
                            "num_iid": "10016",
                            "title": "title:1006",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":2,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ],
                            "tags":[
                                {
                                    tagId:1,
                                    tagName:"ssss"
                                },
                                {
                                    tagId:2,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:3,
                                    tagName:"标签二"
                                },
                                {
                                    tagId:4,
                                    tagName:"标签四"
                                }
                            ]
                        },
                        {
                            "num_iid": "10017",
                            "title": "title:1007",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":2,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10018",
                            "title": "title:1008",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":2,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10019",
                            "title": "title:1009",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":2,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10020",
                            "title": "title:10020",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "outerId":123456,
                            "skuSize":2,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10021",
                            "title": "title:10021",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "outerId":123456,
                            "skuSize":2,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10021",
                            "title": "title:10021",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "skuSize":2,
                            "outerId":123456,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10022",
                            "title": "title:10022",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "outerId":123456,
                            "skuSize":2,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10023",
                            "title": "title:10023",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "outerId":123456,
                            "skuSize":2,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "num_iid": "10024",
                            "title": "title:10024",
                            "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                            "price": 100,
                            "outerId":123456,
                            "skuSize":2,
                            "skus": [
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                },
                                {
                                    "skuId": "sku:01",
                                    "skuName": "sku:01",
                                    "quantity": 50,
                                    "price": 12.12,
                                    "skuProps": [
                                        {
                                            "pidname": "颜色分类",
                                            "vidname": "灰格"
                                        },
                                        {
                                            "pidname": "鞋码",
                                            "vidname": "28码"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            )
        },
        "getSkuList":function(req,res){
            setInterval(function(){
            res.send(
                [
                    {
                        "skuId": "sku:01",
                        "skuName": "sku:01",
                        "quantity": 50,
                        "price": 12.12,
                        "skuProps": [
                            {
                                "pidname": "颜色分类",
                                "vidname": "灰格"
                            },
                            {
                                "pidname": "鞋码",
                                "vidname": "28码"
                            }
                        ]
                    },
                    {
                        "skuId": "sku:01",
                        "skuName": "sku:01",
                        "quantity": 50,
                        "price": 12.12,
                        "skuProps": [
                            {
                                "pidname": "颜色分类",
                                "vidname": "灰格"
                            },
                            {
                                "pidname": "鞋码",
                                "vidname": "28码"
                            }
                        ]
                    },
                    {
                        "skuId": "sku:01",
                        "skuName": "sku:01",
                        "quantity": 50,
                        "price": 12.12,
                        "skuProps": [
                            {
                                "pidname": "颜色分类",
                                "vidname": "灰格"
                            },
                            {
                                "pidname": "鞋码",
                                "vidname": "28码"
                            }
                        ]
                    },
                    {
                        "skuId": "sku:01",
                        "skuName": "sku:01",
                        "quantity": 50,
                        "price": 12.12,
                        "skuProps": [
                            {
                                "pidname": "颜色分类",
                                "vidname": "灰格"
                            },
                            {
                                "pidname": "鞋码",
                                "vidname": "28码"
                            }
                        ]
                    },
                    {
                        "skuId": "sku:01",
                        "skuName": "sku:01",
                        "quantity": 50,
                        "price": 12.12,
                        "skuProps": [
                            {
                                "pidname": "颜色分类",
                                "vidname": "灰格"
                            },
                            {
                                "pidname": "鞋码",
                                "vidname": "28码"
                            }
                        ]
                    },
                    {
                        "skuId": "sku:01",
                        "skuName": "sku:01",
                        "quantity": 50,
                        "price": 12.12,
                        "skuProps": [
                            {
                                "pidname": "颜色分类",
                                "vidname": "灰格"
                            },
                            {
                                "pidname": "鞋码",
                                "vidname": "28码"
                            }
                        ]
                    },
                    {
                        "skuId": "sku:01",
                        "skuName": "sku:01",
                        "quantity": 50,
                        "price": 12.12,
                        "skuProps": [
                            {
                                "pidname": "颜色分类",
                                "vidname": "灰格"
                            },
                            {
                                "pidname": "鞋码",
                                "vidname": "28码"
                            }
                        ]
                    }
                ])
            },3000)
        },
        //查询标准类目列表
        "getStandardCategoryByShopId": function (req, res) {
            res.send([
                {
                    "cid": "50010404",
                    "isLeaf": "false",
                    "name": "shangpin",
                    "parentCid": "0",
                    "sortOrder": "14"
                },

                {
                    "cid": "11",
                    "isLeaf": "true",
                    "name": "手套",
                    "parentCid": "50010404",
                    "sortOrder": "14"
                },
                {
                    "cid": "50010470",
                    "isLeaf": "true",
                    "name": "ccccc",
                    "parentCid": "000",
                    "sortOrder": "14"
                },
                {
                    "cid": "50011150",
                    "isLeaf": "true",
                    "name": "其它",
                    "parentCid": "50010404",
                    "sortOrder": "0"
                },
                {
                    "cid": "50011153",
                    "isLeaf": "true",
                    "name": "背心/马甲",
                    "parentCid": "50010404",
                    "sortOrder": "53"
                },
                {
                    "cid": "50014493",
                    "isLeaf": "true",
                    "name": "双肩背包",
                    "parentCid": "50010404",
                    "sortOrder": "8"
                },
                {
                    "cid": "50014500",
                    "isLeaf": "true",
                    "name": "钱包/卡包/证件包",
                    "parentCid": "50010404",
                    "sortOrder": "11"
                },
                {
                    "cid": "50016759",
                    "isLeaf": "true",
                    "name": "充气床",
                    "parentCid": "50010404",
                    "sortOrder": "10"
                }
            ]);
        },
        //根据标准类目CID查询商品属性信息列表
        "getPropertysByCid": function (req, res) {
            res.send([
                {
                    "cid": "1",
                    "pid": "1626846",
                    "name": "适用人群"
                },
                {
                    "cid": "2",
                    "pid": "1626847",
                    "name": "按事件送礼"
                },
                {
                    "cid": "3",
                    "pid": "1626848",
                    "name": "按关系送礼"
                },
                {
                    "cid": "4",
                    "pid": "1627207",
                    "name": "颜色分类"
                },
                {
                    "cid": "5",
                    "pid": "1632501",
                    "name": "货号"
                },
                {
                    "cid": "6",
                    "pid": "20000",
                    "name": "品牌"
                },
                {
                    "cid": "7",
                    "pid": "31709",
                    "name": "质地"
                },
                {
                    "cid": "8",
                    "pid": "33298",
                    "name": "款式"
                },
                {
                    "cid": "9",
                    "pid": "33300",
                    "name": "类别"
                }
            ])
        },
        //根据标准类目CID与商品属性PID查询商品属性值信息列表
        "getPropertysByCidAndPid": function (req, res) {
            res.send([
                {
                    "cid": "11",
                    "pid": "20000",
                    "vid": "102480836",
                    "prop_name": "品牌",
                    "name": "Culrag/卡尔拉格"
                },
                {
                    "cid": "22",
                    "pid": "20000",
                    "vid": "106934873",
                    "prop_name": "品牌",
                    "name": "肖派"
                },
                {
                    "cid": "33",
                    "pid": "20000",
                    "vid": "107681278",
                    "prop_name": "品牌",
                    "name": "幸福街"
                },
                {
                    "cid": "44",
                    "pid": "20000",
                    "vid": "112136764",
                    "prop_name": "品牌",
                    "name": "Actionfox/快乐狐狸"
                },
                {
                    "cid": "55",
                    "pid": "20000",
                    "vid": "114148500",
                    "prop_name": "品牌",
                    "name": "Noolders/罗欧蒂斯"
                },
                {
                    "cid": "66",
                    "pid": "20000",
                    "vid": "11495455",
                    "prop_name": "品牌",
                    "name": "TAX"
                },
                {
                    "cid": "77",
                    "pid": "20000",
                    "vid": "116282167",
                    "prop_name": "品牌",
                    "name": "雪卡兰"
                },
                {
                    "cid": "88",
                    "pid": "20000",
                    "vid": "121461202",
                    "prop_name": "品牌",
                    "name": "Lohoyoso/乐活悠享"
                },
                {
                    "cid": "99",
                    "pid": "20000",
                    "vid": "122517960",
                    "prop_name": "品牌",
                    "name": "Alyzee/爱丽榭"
                },
                {
                    "cid": "100",
                    "pid": "20000",
                    "vid": "12546391",
                    "prop_name": "品牌",
                    "name": "RGLT/瑞格丽特"
                },
                {
                    "cid": "111",
                    "pid": "20000",
                    "vid": "125703",
                    "prop_name": "品牌",
                    "name": "VANCAMEL/西域骆驼"
                },
                {
                    "cid": "112",
                    "pid": "20000",
                    "vid": "131181796",
                    "prop_name": "品牌",
                    "name": "Lubeiny/璐斑妮"
                },
                {
                    "cid": "113",
                    "pid": "20000",
                    "vid": "141928876",
                    "prop_name": "品牌",
                    "name": "特时曼"
                },
                {
                    "cid": "114",
                    "pid": "20000",
                    "vid": "14294441",
                    "prop_name": "品牌",
                    "name": "Ptah/布塔"
                },
                {
                    "cid": "115",
                    "pid": "20000",
                    "vid": "14918626",
                    "prop_name": "品牌",
                    "name": "DQG"
                },
                {
                    "cid": "116",
                    "pid": "20000",
                    "vid": "151380230",
                    "prop_name": "品牌",
                    "name": "童声健儿"
                },
                {
                    "cid": "117",
                    "pid": "20000",
                    "vid": "153822300",
                    "prop_name": "品牌",
                    "name": "ALLFOND/欧凡迪"
                },
                {
                    "cid": "118",
                    "pid": "20000",
                    "vid": "16124995",
                    "prop_name": "品牌",
                    "name": "Gaoboo/高帛"
                },
                {
                    "cid": "50010410",
                    "pid": "20000",
                    "vid": "188964101",
                    "prop_name": "品牌",
                    "name": "Suobado/索芭朵"
                },
                {
                    "cid": "119",
                    "pid": "20000",
                    "vid": "20089",
                    "prop_name": "品牌",
                    "name": "Polo"
                },
                {
                    "cid": "200",
                    "pid": "20000",
                    "vid": "20558",
                    "prop_name": "品牌",
                    "name": "Burberry/巴宝莉"
                },
                {
                    "cid": "211",
                    "pid": "20000",
                    "vid": "20578",
                    "prop_name": "品牌",
                    "name": "Nike/耐克"
                },
                {
                    "cid": "222",
                    "pid": "20000",
                    "vid": "222500975",
                    "prop_name": "品牌",
                    "name": "塔哒儿"
                },
                {
                    "cid": "223",
                    "pid": "20000",
                    "vid": "242784376",
                    "prop_name": "品牌",
                    "name": "G＆G Avenue"
                },
                {
                    "cid": "224",
                    "pid": "20000",
                    "vid": "243248652",
                    "prop_name": "品牌",
                    "name": "ALA MASTER"
                },
                {
                    "cid": "225",
                    "pid": "20000",
                    "vid": "272522700",
                    "prop_name": "品牌",
                    "name": "HORA&SORA"
                },
                {
                    "cid": "226",
                    "pid": "20000",
                    "vid": "29058899",
                    "prop_name": "品牌",
                    "name": "Lavie/乐为"
                },
                {
                    "cid": "227",
                    "pid": "20000",
                    "vid": "29527",
                    "prop_name": "品牌",
                    "name": "Uniqlo/优衣库"
                },
                {
                    "cid": "228",
                    "pid": "20000",
                    "vid": "297168221",
                    "prop_name": "品牌",
                    "name": "CABUDYE/黛艺"
                },
                {
                    "cid": "229",
                    "pid": "20000",
                    "vid": "29877",
                    "prop_name": "品牌",
                    "name": "Gap"
                },
                {
                    "cid": "230",
                    "pid": "20000",
                    "vid": "30066",
                    "prop_name": "品牌",
                    "name": "Juicy Couture"
                },
                {
                    "cid": "231",
                    "pid": "20000",
                    "vid": "30302154",
                    "prop_name": "品牌",
                    "name": "读你"
                },
                {
                    "cid": "232",
                    "pid": "20000",
                    "vid": "319332498",
                    "prop_name": "品牌",
                    "name": "闽品汇"
                },
                {
                    "cid": "233",
                    "pid": "20000",
                    "vid": "32342659",
                    "prop_name": "品牌",
                    "name": "Diolin/黛欧琳"
                },
                {
                    "cid": "234",
                    "pid": "20000",
                    "vid": "3283850",
                    "prop_name": "品牌",
                    "name": "Crocodile/鳄鱼恤"
                },
                {
                    "cid": "235",
                    "pid": "20000",
                    "vid": "337432589",
                    "prop_name": "品牌",
                    "name": "walking on gold/步金者"
                },
                {
                    "cid": "236",
                    "pid": "20000",
                    "vid": "34688292",
                    "prop_name": "品牌",
                    "name": "Momiton/摩米特"
                },
                {
                    "cid": "237",
                    "pid": "20000",
                    "vid": "361622923",
                    "prop_name": "品牌",
                    "name": "yao chuan/耀川"
                },
                {
                    "cid": "238",
                    "pid": "20000",
                    "vid": "362526701",
                    "prop_name": "品牌",
                    "name": "KADUSHA/卡秋莎"
                },
                {
                    "cid": "239",
                    "pid": "20000",
                    "vid": "3637388",
                    "prop_name": "品牌",
                    "name": "gold coral/金珊瑚"
                },
                {
                    "cid": "240",
                    "pid": "20000",
                    "vid": "374634049",
                    "prop_name": "品牌",
                    "name": "BAEEG"
                },
                {
                    "cid": "241",
                    "pid": "20000",
                    "vid": "3755895",
                    "prop_name": "品牌",
                    "name": "Jinho/金猴"
                },
                {
                    "cid": "242",
                    "pid": "20000",
                    "vid": "3889310",
                    "prop_name": "品牌",
                    "name": "COACH/蔻驰"
                },
                {
                    "cid": "243",
                    "pid": "20000",
                    "vid": "3940239",
                    "prop_name": "品牌",
                    "name": "爱博尔"
                },
                {
                    "cid": "244",
                    "pid": "20000",
                    "vid": "4282809",
                    "prop_name": "品牌",
                    "name": "BIOLIVING/百武西"
                },
                {
                    "cid": "255",
                    "pid": "20000",
                    "vid": "45146869",
                    "prop_name": "品牌",
                    "name": "丹杰仕"
                },
                {
                    "cid": "266",
                    "pid": "20000",
                    "vid": "4525452",
                    "prop_name": "品牌",
                    "name": "意大利阿玛尼"
                },
                {
                    "cid": "277",
                    "pid": "20000",
                    "vid": "4535252",
                    "prop_name": "品牌",
                    "name": "Mexican/稻草人"
                },
                {
                    "cid": "333",
                    "pid": "20000",
                    "vid": "4536243",
                    "prop_name": "品牌",
                    "name": "INMAN/茵曼"
                },
                {
                    "cid": "444",
                    "pid": "20000",
                    "vid": "50957754",
                    "prop_name": "品牌",
                    "name": "Booze/宝泽"
                },
                {
                    "cid": "555",
                    "pid": "20000",
                    "vid": "58534084",
                    "prop_name": "品牌",
                    "name": "明臣"
                },
                {
                    "cid": "666",
                    "pid": "20000",
                    "vid": "6169613",
                    "prop_name": "品牌",
                    "name": "梦娜世家"
                },
                {
                    "cid": "2000",
                    "pid": "20000",
                    "vid": "6744718",
                    "prop_name": "品牌",
                    "name": "羽纯"
                },
                {
                    "cid": "777",
                    "pid": "20000",
                    "vid": "68276630",
                    "prop_name": "品牌",
                    "name": "Night Elf"
                },
                {
                    "cid": "999",
                    "pid": "20000",
                    "vid": "6873749",
                    "prop_name": "品牌",
                    "name": "元昊"
                },
                {
                    "cid": "888",
                    "pid": "20000",
                    "vid": "7458742",
                    "prop_name": "品牌",
                    "name": "BUB"
                },
                {
                    "cid": "3423",
                    "pid": "20000",
                    "vid": "83443997",
                    "prop_name": "品牌",
                    "name": "Monteamor/蒙蒂埃莫"
                },
                {
                    "cid": "325",
                    "pid": "20000",
                    "vid": "87500993",
                    "prop_name": "品牌",
                    "name": "WARMSPACE/温倍尔"
                },
                {
                    "cid": "466",
                    "pid": "20000",
                    "vid": "9670418",
                    "prop_name": "品牌",
                    "name": "卡摩梵迪"
                }
            ])
        },
        //商品选择器-商品自定义类目
        "getCustomcategory": function (req, res) {
            res.send([
                {"id": "205502481", "pid": null, "name": "户外帐篷", "isParent": true},
                {"id": "205502486", "pid": null, "name": "户外睡袋", "isParent": true},
                {"id": "205502482", "pid": "205502481", "name": "野营帐篷", "isParent": false},
                {"id": "205502484", "pid": "205502481", "name": "沙滩休闲帐篷", "isParent": false},
                {"id": "205502485", "pid": "205502481", "name": "帐篷附件", "isParent": false},
                {"id": "205502487", "pid": "205502486", "name": "羽绒睡袋", "isParent": false},
                {"id": "205502488", "pid": "205502486", "name": "棉质睡袋", "isParent": false},
                {"id": "205502489", "pid": "205502486", "name": "抓绒睡袋", "isParent": false},
                {"id": "205502490", "pid": null, "name": "户外背包", "isParent": true},
                {"id": "205502491", "pid": "205502490", "name": "30升以下背包", "isParent": false},
                {"id": "205502492", "pid": "205502490", "name": "30-60升背包", "isParent": false},
                {"id": "205502493", "pid": "205502490", "name": "60升以上背包", "isParent": false},
                {"id": "205502494", "pid": "205502490", "name": "腰包|小包", "isParent": false},
                {"id": "205502511", "pid": null, "name": "户外服装", "isParent": true},
                {"id": "205502512", "pid": "205502511", "name": "冲锋衣裤 抓绒衣裤", "isParent": false},
                {"id": "205502513", "pid": "205502511", "name": "眼镜太阳镜", "isParent": false},
                {"id": "205502514", "pid": "205502511", "name": "速干衣裤", "isParent": false},
                {"id": "205502515", "pid": null, "name": "野营附件", "isParent": true},
                {"id": "205502516", "pid": "205502515", "name": "防潮垫", "isParent": false},
                {"id": "205502517", "pid": "205502515", "name": "充气垫", "isParent": false},
                {"id": "205502522", "pid": "205502515", "name": "充气枕", "isParent": false},
                {"id": "205502526", "pid": null, "name": "野营探险", "isParent": true},
                {"id": "205502527", "pid": "205502526", "name": "灯具|照明|手电", "isParent": false},
                {"id": "205502528", "pid": "205502526", "name": "户外烤炉", "isParent": false},
                {"id": "205502529", "pid": "205502526", "name": "野餐垫", "isParent": false},
                {"id": "205502532", "pid": "205502526", "name": "吊床", "isParent": false},
                {"id": "205502535", "pid": "205502526", "name": "餐具|炉具|燃具", "isParent": false},
                {"id": "205502536", "pid": "205502526", "name": "刀具|多用工具", "isParent": false},
                {"id": "269766936", "pid": "205502511", "name": "登山鞋徒步鞋溯溪鞋", "isParent": false},
                {"id": "269771580", "pid": null, "name": "休闲桌椅", "isParent": true},
                {"id": "269771581", "pid": "269771580", "name": "折叠桌椅", "isParent": false},
                {"id": "415591675", "pid": null, "name": "精准导购支持", "isParent": true},
                {"id": "733972006", "pid": null, "name": "日韩风", "isParent": true},
                {"id": "747989262", "pid": "205502526", "name": "水壶|保温杯|水具", "isParent": false},
                {"id": "748780239", "pid": null, "name": "烧烤世家高档产品", "isParent": true},
                {"id": "748780240", "pid": "748780239", "name": "烧烤炉及套餐组合", "isParent": false},
                {"id": "748780241", "pid": "748780239", "name": "野餐包冰包", "isParent": false},
                {"id": "748780242", "pid": "748780239", "name": "烧烤工具", "isParent": false},
                {"id": "748781327", "pid": "748780239", "name": "高档折叠桌椅", "isParent": false},
                {"id": "748792650", "pid": "205502526", "name": "登山杖", "isParent": false},
                {"id": "792307406", "pid": null, "name": "欧美风", "isParent": true},
                {"id": "800100024", "pid": null, "name": "王健的主类", "isParent": true},
                {"id": "800100025", "pid": "800100024", "name": "王健的子类1", "isParent": false},
                {"id": "800100026", "pid": "800100024", "name": "王健的子类2", "isParent": false}
            ])
        },
        //查询商品标签列表
        "getTags": function (req, res) {
            res.send([
                {
                    "tagId": 1,
                    "tagName": "春季新款"
                },
                {
                    "tagId": 2,
                    "tagName": "夏季新款"
                },
                {
                    "tagId": 3,
                    "tagName": "秋季新款"
                }
            ])
        },
        //初始化查询条件 2014-4-4
        "getCondition": function (req, res) {
            res.send({
                    "isKeywordAnd": true,
                    "keywords": ["H", "heng", "11"],
                    "tagsIds": [1, 2, 3],
                    "productStandardCategoryClustersVO": {
                        "productStandardCategoryId": "50010114",
                        "productStandardCategoryName": "ddddd",
                        "productStandardCategoryPropertyId": "50010415",
                        "productStandardCategoryPropertyValueName": "类别",
                        "productStandardCategoryPropertyValueId": "102480836",
                        "productStandardCategoryPropertyName": "Culrag/卡尔拉格"
                    },
                    "shopId": null,
                    "isOnsale": 'all',
                    "productCustomCategoryVO": {
                        "leafCid": [800100025, 800100026]
                    },
                    "isSelectorSearch": 1,
                    "numiid": "dsf",
                    "maxPrice": 20,
                    "productSkuVO": {
                        "skuId": "11",
                        "skuName": "22",
                        "outerId": "1"
                    },
                    "productOuterVO": {
                        "startCutBit": 0,
                        "outerCutFlag": false,
                        "endCutBit": 0,
                        "outerId": "sdfsdf"
                    },
                    "minPrice": 10
                }
            )
        },
        //查询之前选中的商品列表 2014-4-7
        "getFindedProduct": function (req, res) {
            res.send({
                "total": 1,
                "page": 0,
                "pageSize": 20,
                "data": [
                    {
                        "num_iid": "10010",
                        "title": "title:1001",
                        "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                        "price": 100,
                        "skus": [
                            {
                                "skuId": "sku:01",
                                "skuName": "sku:01",
                                "quantity": 50,
                                "price": 12.12,
                                "skuProps": [
                                    {
                                        "pidname": "颜色分类",
                                        "vidname": "灰格"
                                    },
                                    {
                                        "pidname": "鞋码",
                                        "vidname": "28码"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "num_iid": "10012",
                        "title": "title:1002",
                        "pic_url": "http://img03.taobaocdn.com/bao/uploaded/i3/T1nRJ_XiXFXXce7cAT_011207.jpg",
                        "price": 100,
                        "skus": [
                            {
                                "skuId": "sku:01",
                                "skuName": "sku:01",
                                "quantity": 50,
                                "price": 12.12,
                                "skuProps": [
                                    {
                                        "pidname": "颜色分类",
                                        "vidname": "灰格"
                                    },
                                    {
                                        "pidname": "鞋码",
                                        "vidname": "28码"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        },
        //提交查询条件和查询结果
        "postSelector": function (req, res) {
            res.send({
                "snapshootId": 5,
                "selectorRequest": {
                    "isKeywordAnd": false,
                    "keywords": ["H", "heng", "11"],
                    "tagsIds": [ ],
                    "productStandardCategoryClustersVO": {
                        "productStandardCategoryPropertyValueId": "",
                        "productStandardCategoryPropertyName": "",
                        "productStandardCategoryId": "",
                        "productStandardCategoryName": "",
                        "productStandardCategoryPropertyId": "",
                        "productStandardCategoryPropertyValueName": ""
                    },
                    "shopId": "",
                    "isOnsale": 'all',
                    "productCustomCategoryVO": {
                        /*   "rootCid": [ ],
                         "cid": "",*/
                        "leafCid": [ ]
                    },
                    "numiid": "",
                    "maxPrice": 0,
                    "productSkuVO": {
                        "skuId": "",
                        "skuName": "",
                        "outerId": ""
                    },
                    "productOuterVO": {
                        "startCutBit": 0,
                        "outerCutFlag": "",
                        "endCutBit": 0,
                        "outerId": ""
                    },
                    "minPrice": 0
                },
                "numIids": [
                    {
                        "skuIds": [
                            {
                                "skuId": 102
                            },
                            {
                                "skuId": 0
                            }
                        ],
                        "numIid": 1
                    },
                    {
                        "skuIds": [
                            {
                                "skuId": 102
                            },
                            {
                                "skuId": 0
                            }
                        ],
                        "numIid": 2
                    }
                ]
            })
        },
        //获取选中商品的个数 2014-4-12
        "getProductCount": function (req, res) {
            res.send({"count": 4})
        },
        //查询商品列表 2014-5-13
        "getproductsBysnapshootId": function (req, res) {
            res.send({
                "total": 1,
                "page": 0,
                "pageSize": 20,
                "data": [
                    {
                        "num_iid": "1001",
                        "title": "title:1001",
                        "pic_url": "http://",
                        "price": null,
                        "skus": [
                            {
                                "skuId": "sku:01",
                                "skuName": "sku:01",
                                "quantity": 50,
                                "price": 12.12,
                                "skuProps": [
                                    {
                                        "pidname": "颜色分类",
                                        "vidname": "灰格"
                                    },
                                    {
                                        "pidname": "鞋码",
                                        "vidname": "28码"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "num_iid": "10012",
                        "title": "title:1002",
                        "pic_url": "http://",
                        "price": null,
                        "skus": [
                            {
                                "skuId": "sku:01",
                                "skuName": "sku:01",
                                "quantity": 50,
                                "price": 12.12,
                                "skuProps": [
                                    {
                                        "pidname": "颜色分类",
                                        "vidname": "灰格"
                                    },
                                    {
                                        "pidname": "鞋码",
                                        "vidname": "28码"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
        }
    }}
