import { useRef, useState } from "react";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { database } from "../../firebase";

const EmailInput = () => {
  const [state, setState] = useState({
    error: false,
    isSubscribed: false,
    isSubmitted: false,
  });
  const inputRef = useRef(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    const validator =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validator.test(value)) {
      return setState((prevState) => ({
        ...prevState,
        error: true,
        isSubscribed: false,
      }));
    }
    if (state.error) {
      setState((prevState) => ({ ...prevState, error: false }));
    }
    try {
      const userRef = collection(database, "users");
      const q = query(userRef, where("email", "==", value));
      const getRes = await getDocs(q);
      if (!getRes.empty) {
        setState((prevState) => ({ ...prevState, isSubscribed: true }));
        throw new Error("User already exists");
      }
      const docRef = await addDoc(userRef, { email: value });
      console.log(`Response is submitted with id:`, docRef.id);
      inputRef.current.value = "";
      setState((prevState) => ({
        ...prevState,
        isSubmitted: true,
        isSubscribed: false,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <div className="flex flex-col items-center justify-center md:flex-row md:gap-x-2">
          <div className="relative pt-4 px-0 pb-5 flex items-center justify-center w-full md:w-auto">
            <input
              type="email"
              name="email"
              required={true}
              ref={inputRef}
              className={`${
                state.error || state.isSubscribed ? "!border-light_red " : ""
              } px-5 py-3 max-w-xs md:max-w-[500px] min-w-[250px] md:min-w-[350px] w-full text-base text-dark_gray font-light border border-solid border-blue rounded-2xl md:rounded-3xl outline-none`}
              placeholder="Your email address..."
            />
            <span
              className={`${
                state.error ? "block" : "hidden"
              } absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-sm font-semibold text-center text-light_red`}
            >
              Please provide a valid email address
            </span>
            <span
              className={`${
                state.isSubscribed ? "block" : "hidden"
              } absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-sm font-semibold text-center text-light_red`}
            >
              Email is already subscribed
            </span>
          </div>
          <input
            type="submit"
            className="py-2 px-5 min-w-[250px] md:min-w-[50px] max-w-xs md:max-w-[150px] w-full text-white text-base font-light bg-blue hover:bg-[#3165eb] border border-solid border-blue rounded-2xl md:rounded-3xl cursor-pointer"
            value="Subscribe"
          />
        </div>
      </form>
      <div
        className={`${
          state.isSubmitted ? "flex z-10" : "hidden -z-10"
        } fixed top-0 left-0 flex-col items-center justify-center h-full w-full bg-gradient`}
      >
        <div className="relative py-8 px-4 min-w-[250px] max-w-xs w-full h-auto bg-white rounded">
          <div
            className="absolute top-2 right-2 flex flex-col items-center justify-center w-[21px] h-[21px] cursor-pointer"
            onClick={() =>
              setState((prevState) => ({ ...prevState, isSubmitted: false }))
            }
          >
            <span className="bg-dark_gray w-full h-[3px] rotate-45 translate-y-[1px] rounded-sm"></span>
            <span className="bg-dark_gray w-full h-[3px] -rotate-45 -translate-y-0.5 rounded-sm"></span>
          </div>
          <h3 className="text-lg text-dark_gray font-medium">
            Thank you for subscribing!
          </h3>
          <p className="mt-2 text-sm text-dark_gray">
            We will send you text updates on your email.
          </p>
        </div>
      </div>
    </>
  );
};

export default EmailInput;
