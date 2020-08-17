import React from 'react';
import {Button, Layout} from "@ui-kitten/components";
import FormUpload from '../components/formUpload'
import RiForm from "../forms/riForm";

export default function FormTemplateScreen({navigation}){
  return (
    <FormUpload template={"RI"}/>
  )
}