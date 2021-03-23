export const RolModel = [{
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
    id: 'description',
    name: 'Description',
    type: 'textarea',
    form: true,
    grid: true

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
}, {
    id: 'actions',
    name: 'Actions',
    type: 'text',
    form: false,
    grid: true
}]