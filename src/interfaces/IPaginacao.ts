export interface IPaginacao<T> {
    count: number,
    next: String,
    previous: string
    results: T[]
}