import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

type TBiometricsContext = {
    isUnlocked: boolean;
    authenticate: () => Promise<void>;
};

const BiometricsContext = createContext<TBiometricsContext>({
    isUnlocked: false,
    authenticate: async () => {},
});

export const BiometricProvider = ({ children }: PropsWithChildren) => {
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

    const authenticate = async () => {
        const enrolled = await LocalAuthentication.getEnrolledLevelAsync();
        const supported = await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log("check", enrolled, supported);
        const res = await LocalAuthentication.authenticateAsync();
        setIsUnlocked(res.success);
    };
    return (
        <BiometricsContext.Provider value={{ isUnlocked, authenticate }}>
            {children}
        </BiometricsContext.Provider>
    );
};

export const useBiometrics = () => useContext(BiometricsContext);
