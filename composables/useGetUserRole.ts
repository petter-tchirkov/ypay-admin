export const getUserRole = (role: number) => {
    switch (role) {
        case 0:
            return 'Customer'
        case 1:
            return 'Global Admin'
        case 2:
            return 'Chain Admin'
        case 3:
            return 'Spot Admin'
    }
}