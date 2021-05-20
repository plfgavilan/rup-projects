export interface GetAllDao<Response> {
  getAll(): Promise<Response>;
}

export interface CreateDao<S, Response> {
  create(dto: S): Promise<Response>;
}

export interface UpdateDao<I, S, Response> {
  update(id: I, dto: S): Promise<Response>;
}

export interface DeleteOneDao<I, Response> {
  delete(id: I): Promise<Response>;
}
