export const useMenuStore = defineStore('menu', () => {
  const mockMenu = ref(
    [
      {
        "id": 0,
        "createdAt": "2024-04-26T06:56:15.494Z",
        "spotId": 0,
        "menuProducts": [
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
              "menuProducts": [
                "string"
              ]
            },
            "isActive": true
          }
        ],
        "isAtive": true,
        "name": "Breakfast",
        "description": "Menu is active until 10am"
      },
      {
        "id": 0,
        "createdAt": "2024-04-26T06:56:15.494Z",
        "spotId": 0,
        "menuProducts": [
          {
            "id": 0,
            "createdAt": "2024-04-26T06:56:15.494Z",
            "menuId": 0,
            "productId": 0,
            "product": {
              "id": 0,
              "createdAt": "2024-04-26T06:56:15.494Z",
              "name": "Borsch",
              "description": "Ukrainian traditional soup",
              "price": 0,
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
              "name": "Roast beef",
              "description": "English dinner",
              "price": 0,
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
              "menuProducts": [
                "string"
              ]
            },
            "isActive": true
          }
        ],
        "isAtive": true,
        "name": "Dinner",
        "description": "Menu is active until 3pm"
      }
    ]
  )

  return { mockMenu }
})
