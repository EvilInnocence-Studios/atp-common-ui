import { createInjector, inject, mergeProps } from "unstateless";
import {LogoSpinnerComponent} from "./LogoSpinner.component";
import {ILogoSpinnerInputProps, LogoSpinnerProps, ILogoSpinnerProps} from "./LogoSpinner.d";
import { overridable } from "@core/lib/overridable";
import { useEffect } from "react";
import { Spin } from "antd";
import { LogoImage } from "../LogoImage";
import styles from './LogoSpinner.module.scss';

const injectLogoSpinnerProps = createInjector(({classes = styles}:ILogoSpinnerInputProps):ILogoSpinnerProps => {

    useEffect(() => {
        Spin.setDefaultIndicator(<div className={classes.spinnerContainer}>
            <div className={classes.spinner}>&nbsp;</div>
            <LogoImage />
        </div>);
    }, []);
    return {};
});

const connect = inject<ILogoSpinnerInputProps, LogoSpinnerProps>(mergeProps(
    injectLogoSpinnerProps,
));
export const connectLogoSpinner = connect;

export const LogoSpinner = overridable<ILogoSpinnerInputProps>(connect(LogoSpinnerComponent));
