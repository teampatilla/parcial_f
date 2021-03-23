export const ProductModel = [{
    id: 'name',
    name: 'Name',
    type: 'text',
    form: true,
    grid: true
},
{
    id: 'code',
    name: 'Code',
    type: 'text',
    form: true,
    grid: true
},
{
    id: 'price',
    name: 'Price',
    type: 'text',
    form: true,
    grid: true

},
{
    id: 'description',
    name: 'Description',
    type: 'textarea',
    form: true,
    grid: true

},
{
    id: 'path',
    name: 'Image',
    type: 'file',
    form: true,
    grid: false

},
{
    id: 'categories',
    name: 'Categories',
    type: 'select',
    foreign: {
        controller: 'category',
        key: '_id'
    },
    form: true,
    grid: false
},
{
    id: 'status',
    name: 'Status',
    type: 'select',
    options: [{
        name: 'Active',
        value: '1'
    },
    {
        name: 'Inactive',
        value: '0'
    }],
    form: true,
    grid: true
},
{
    id: 'actions',
    name: 'Actions',
    type: 'text',
    form: false,
    grid: true
}]