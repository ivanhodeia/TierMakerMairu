export const ROUTE = {
  Login: '',
  TierListGrid: 'tiermaker/all',
  TierListDetails: (id?: string) => `tiermaker/details/${id ? id : ':id'}`
}
