FORMAT: 1A

Shop
====

An API to advertise Acme’s products.


Group Products
==============

The Acme catalog.


Products [/products]
--------------------

Returns all available products in the catalog.

### GET

  + Response 200 (application/json)
  
    + Attributes (array[Product])


Product [/products/{id}]
------------------------

Returns a specified product.

### GET

  + Response 200 (application/json)

    + Attributes (Product)


Product Photos [/products/{id}/photos]
--------------------------------------

Returns all photos for a product.

### GET

  + Response 200 (application/json)
  
    + Attributes (array[Photo])


Data Structures
===============

## Product (object) - A product from Acme's catalog

  - id: 1 (number, required) - Unique identifier
  - name: A green door (string, required) - Short description of the product
  - price: 12.50 (number, required)
  - tags: home, green (array[string])
  
## Photo (object) - A photo of a product

  - id: 1 (number, required) - Unique identifier
  - caption: Front view (string, required) - Caption describing the photo
  - url: http://example.com/image.jpg (string, required) - Full URL to a JPEG or PNG image
