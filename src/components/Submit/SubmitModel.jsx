export const SubmitModel = [{
    id: 'name',
    name: 'Name',
    type: 'text',
    form: true,
    grid: true
},
{
    id: 'phone',
    name: 'Phone',
    type: 'text',
    form: true,
    grid: true

},
{
    id: 'email',
    name: 'Email',
    type: 'email',
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