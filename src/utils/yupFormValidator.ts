// packages
import * as Yup from "yup";

export class YupFormValidator {
  // variables
  private schema: Yup.ObjectSchema<Yup.AnyObject>;
  private data: object;
  private errorSetter: (errors: string[]) => void;

  // constructor
  constructor(
    schema: Yup.ObjectSchema<Yup.AnyObject>,
    data: object,
    errorSetter: (errors: string[]) => void
  ) {
    this.schema = schema;
    this.data = data;
    this.errorSetter = errorSetter;
  }

  // schema validator
  public async validate(): Promise<boolean> {
    try {
      await this.schema.validate(this.data, { abortEarly: false });
      this.errorSetter([]);
      return true;
    } catch (error) {
      const validationErrors: string[] = [];

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors.push(err.message);
          }
        });
      } else {
        validationErrors.push("Validation failed, please check your input.");
      }

      this.errorSetter(validationErrors);
      return false;
    }
  }
}
