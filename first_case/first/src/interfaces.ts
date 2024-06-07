enum Sex {
    male = 'male',
    female = 'female'
}
// interface User {
//     id: number
//     name: string
//     last_name: string
//     sex: Sex
//     problems: boolean
// }
export interface UserCreatetionsAttr{
    name?: string 
    last_name?: string
    sex?: Sex
    problems?: boolean
}