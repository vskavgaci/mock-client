# Mock Api

MockApi frontend geliştirmeleri sırasında mock endpointler oluşturup geliştirme sürecine yardımcı olacak bir yardımcı araçtır.

#### Demo
[Mock Api](http://mockapi.me)

## Kurulum

Kurulum için öncelikle backend kısmına ihtiyaç vardır [MockApi Server](https://github.com/vskavgaci/mock-server)

MockApi Server kurulumundan sonra

.env dosyası oluşturarak bu alanda;

```
VUE_APP_API_URL=http://localhost:5000
VUE_APP_JWT_SECRET=mockapi.me
```

değişkenlerini oluşturun. VUE_APP_API_URL için MockApi Server adresini vermeniz gerekmektedir.

```bash
npm install
npm run build
```

## Özellikler

##### Dynamic Route

Route oluştururken parametre başlangıcına ":" karakterini yazabilirsiniz.

```
:id
user/:id
```

Bu parametreye istenildiği takdirde response alanında $id yazılarak ulaşılabilir.

##### Request Validation

Oluşturulan request parametreleri validate edilebilir.

###### Örnek
```
{
    "name": "required|min:3|max:7",
    "age": "required|between:18,40",
    "stock": "integer",
    "price": "required|float"
}
```

###### Desteklenen validate kuralları:

required, min, max, integer, float, numeric, between

#### Dynamic Response

MockApi içerisinde [Faker.js](https://github.com/marak/Faker.js/) entegre edilmiştir.
###### Örnek
```
{
    "firstname": "{{name.firstName}}",
    "lastname": "{{name.lastName}}",
    "phone": "{{phone.phoneNumber}}",
    "products--total-5--": [
        {
            "name": "{{commerce.productName}}",
            "price": "{{commerce.price}}",
            "image": "{{image.image(400,400)}}"
        }
    ]
}
```

"--total-{count}--" ile diziler oluşturulabilir.

"{{$id}}" ile request sırasında gönderilen parametrelere ulaşabilirsiniz.



## Contributing
Herhangi sorunla karşılaşırsanız bu konu ile ilgili issue açabilir, ya da pull request talebinde bulunabilirsiniz.

## License
[MIT](https://choosealicense.com/licenses/mit/)
