import articlesModel, { ArticlesModel } from './articleModel';

export interface StoreModel {
    articles: ArticlesModel;
}

const storeModel: StoreModel = {
    articles: articlesModel,
};

export default storeModel;