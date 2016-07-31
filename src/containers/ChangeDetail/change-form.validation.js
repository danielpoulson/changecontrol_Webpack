export function changeFormIsValid(change) {
  let formIsValid = true;
  let errors = {}; //Clears any previous errors

  if (!change.CC_Descpt) {
    errors.CC_Descpt = 'This field is required';
  } else if (change.CC_Descpt.length < 20) {
    errors.CC_Descpt = 'Must more than 20 characters';
  }

  if (!change.CC_Champ) {
    errors.CC_Champ = 'This field is required';
  }

  if (!change.CC_Comp) {
    errors.CC_Comp = 'This field is required';
  } else if (change.CC_Comp.length < 3) {
    errors.CC_Comp = 'Must be atleast 3 characters';
  }

  if (!change.CC_Code) {
    errors.CC_Code = 'This field is required';
  } else if (change.CC_Code.length < 3) {
    errors.CC_Code = 'Must be atleast 3 characters';
  }

  if (!change.CC_TDate) {
    errors.CC_TDate = 'This field is required';
  } else if (change.CC_TDate === null) {
    errors.CC_TDate = 'This field is required';
  }

  return { formIsValid, errors };
}
