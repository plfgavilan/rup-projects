export interface CommandUseCase<S, T> {
  execute(param: S): Promise<T>;
}
