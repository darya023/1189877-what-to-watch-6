import {renderHook, act} from '@testing-library/react-hooks';
import {useFormData} from './use-form-data';

const fakeInitialFormData = {
  "rating": 10,
  "review-text": ``
};

describe(`useFormData tests`, () => {
  it(`useFormData should return array with 3 elements`, () => {
    const {result} = renderHook(() =>
      useFormData(fakeInitialFormData, jest.fn())
    );

    const {current} = result;
    const [formData, handleFieldChange, handleSubmit] = current;

    expect(current).toHaveLength(3);
    expect(formData).toBeInstanceOf(Object);
    expect(handleFieldChange).toBeInstanceOf(Function);
    expect(handleSubmit).toBeInstanceOf(Function);
  });
  it(`useFormData should be correctly change state`, () => {
    const {result} = renderHook(
        () => useFormData(fakeInitialFormData, jest.fn())
    );

    const expectedInitialFormData = fakeInitialFormData;
    const [initialFormData] = result.current;
    let [, handleFieldChange] = result.current;

    let fakeEvent;
    fakeEvent = {
      target: {
        name: `rating`,
        value: 10
      }
    };
    act(() => handleFieldChange(fakeEvent));

    [, handleFieldChange] = result.current;
    fakeEvent = {
      target: {
        name: `review-text`,
        value: `test`
      }
    };
    act(() => handleFieldChange(fakeEvent));

    const [formData] = result.current;
    expect(initialFormData).toStrictEqual(expectedInitialFormData);
    expect(formData.rating).toBe(10);
    expect(formData[`review-text`]).toBe(`test`);
  });
  it(`useFormData should be call onSubmit`, () => {
    const onSubmit = jest.fn();
    const {result} = renderHook(
        () => useFormData(fakeInitialFormData, onSubmit)
    );
    const [,, handleSubmit] = result.current;
    const fakeEvent = {
      preventDefault: jest.fn()
    };
    handleSubmit(fakeEvent);

    expect(onSubmit).toBeCalled();
    expect(onSubmit).toHaveReturnedWith(void 0);
    expect(onSubmit).toHaveBeenCalledWith(fakeInitialFormData);
  });
});
