export type FormInput = {
    title: string
    firstName: string
    lastName: string
    birthDay: string
    nationality: string
    gender: string
    mobilePhone: string
    passportNo: string
    expectedSalary: string
    citizenId: string

    p1: string
    p2: string
    p3: string
    p4: string
    p5: string
}

export type userFormProps = Omit<FormInput, 'p1' | 'p2' | 'p3' | 'p4' | 'p5'> & {
    citizenId: string
}

export type UserTableProps = {
    firstName: string
    lastName: string
    gender: string
    mobilePhone: string
    nationality: string
}

