export const getRequestStatus = (status: number) => {
  switch (status) {
    case 0:
      return 'New'
    case 1:
      return 'Deleted'
    case 2:
      return 'Accepted'
    case 3:
      return 'Active'
  }
}
