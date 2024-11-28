export type RequireAtLeastOneProperty<
  Obj extends Record<any, any>,
  Keys extends keyof Obj = keyof Obj
> = Keys extends infer A extends string
  ? {
      [K in Exclude<keyof Obj, A>]?: Obj[K];
    } & { [K in A]: Obj[A] }
  : never;

export type RequireAtLeastTwoProperties<
  Obj extends Record<any, any>,
  Keys extends keyof Obj = keyof Obj
> = Keys extends infer FirstKey extends string
  ? Exclude<keyof Obj, FirstKey> extends infer LimitedKeys extends string
    ? LimitedKeys extends infer SecondKey extends string
      ? {
          [K in FirstKey | SecondKey]: Obj[K];
        } & Partial<Obj>
      : never
    : never
  : never;

export type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (x: infer I) => void ? I : never;
