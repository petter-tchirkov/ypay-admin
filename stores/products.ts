export const useProductStore = defineStore('producsts', () => {
  const mockProducts = ref([
    {
      "id": 0,
      "createdAt": "2024-04-26T06:56:15.494Z",
      "menuId": 0,
      "productId": 0,
      "product": {
        "id": 0,
        "createdAt": "2024-04-26T06:56:15.494Z",
        "name": "Roast beef",
        "description": "English dinner",
        "price": 0,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbYlJ2QQL66-47K1HAE8vZYRwcVoaq-MKwptOP3Rs27A&s",
        "menuProducts": [
          "string"
        ]
      },
      "isActive": true
    },
    {
      "id": 0,
      "createdAt": "2024-04-26T06:56:15.494Z",
      "menuId": 0,
      "productId": 0,
      "product": {
        "id": 0,
        "createdAt": "2024-04-26T06:56:15.494Z",
        "name": "Miso soup",
        "description": "Japanese soup with tofu and seaweed",
        "price": 0,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-QgmCCoC1D02taplhRnhXxJ0wbKZcO0vDTJLkyqmYfQ&s",
        "menuProducts": [
          "string"
        ]
      },
      "isActive": true
    },
    {
      "id": 0,
      "createdAt": "2024-04-26T06:56:15.494Z",
      "menuId": 0,
      "productId": 0,
      "product": {
        "id": 0,
        "createdAt": "2024-04-26T06:56:15.494Z",
        "name": "Cereal",
        "description": "Cereal with berries",
        "price": 0,
        "image": "https://lifemadesweeter.com/wp-content/uploads/Easy-Natures-Cereal-Recipe-Whole30-Keto-Low-Carb-Paleo-Vegan-500x500.jpg",
        "menuProducts": [
          "string"
        ]
      },
      "isActive": true
    },
    {
      "id": 0,
      "createdAt": "2024-04-26T06:56:15.494Z",
      "menuId": 0,
      "productId": 0,
      "product": {
        "id": 0,
        "createdAt": "2024-04-26T06:56:15.494Z",
        "name": "Omelet",
        "description": "Omelet with bacon",
        "price": 0,
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX4TrFM8N6duNjM4mECcEbbbXq7Dr2a-YfRF-GRCHMhA&s",
        "menuProducts": [
          "string"
        ]
      },
      "isActive": true
    },
    {
      "id": 0,
      "createdAt": "2024-04-26T06:56:15.494Z",
      "menuId": 0,
      "productId": 0,
      "product": {
        "id": 0,
        "createdAt": "2024-04-26T06:56:15.494Z",
        "name": "Coffee",
        "description": "Coffee",
        "price": 0,
        "image": "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg?quality=90&resize=500,454",
        "menuProducts": [
          "string"
        ]
      },
      "isActive": true
    }
  ])

  return { mockProducts }
})
