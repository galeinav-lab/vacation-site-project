export class Vacation {

    constructor(
    public destination: string,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public price: number,
    public image?: string,
    public imageName?: string,
    public likesCount?: number,
    public isLiked?: boolean,
    public id?: number){}
}