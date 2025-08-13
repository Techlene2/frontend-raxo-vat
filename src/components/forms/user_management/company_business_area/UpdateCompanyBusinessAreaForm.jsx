import React, { useEffect, useState } from 'react'
import { CompanyBusinessAreaImport } from './Imports'
const { Text, Form, useFormik, SaveButton, Email, TextArea, SingleSelect, SelectStatus, AddCompanyBusinessAreaSchema, useNavigate, useLocation, useDispatch, useSelector, cityListTodo, companyListTodo, Loader, toast, ToastContainer, companyBusinessAreaDetailsTodo, updateCompanyBusinessAreaTodo, debounce, lang } = CompanyBusinessAreaImport

export default function UpdateCompanyBusinessAreaForm() {

  const [loading, setLoading] = useState(true)
  const [breakLoading, setBreakLoading] = useState(true)
  const [cityLoading, setCityLoading] = useState(false)

  const { state } = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const details = useSelector(state => state && state.companyBusinessAreaDetails && state.companyBusinessAreaDetails.data)
  const company = useSelector(state => state && state.companyList && state.companyList.data)
  const city_list = useSelector(state => state.cityList && state.cityList.data)
  // console.log(details)

  const company_option = company && company.map(val => (
    { "value": val.id, "label": val.name }
  ))

  const city_option = city_list && city_list.map(val => (
    { "value": val.id, "label": val.name }
  ))

  const initialValues = {

    id: details && details.id,
    company: details && details.company && details.company.id,
    name: details && details.name,
    description: details && details.description,
    address: details && details.address,
    code: details && details.code,
    postalCode: details && details.postalCode,
    email: details && details.email,
    phone: details && details.phone,
    mobile: details && details.mobileNo,
    city: details && details.city && details.city.id,
    status: details && details.isActive,

  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: initialValues,
    validationSchema: AddCompanyBusinessAreaSchema,
    enableReinitialize: true,

    onSubmit: (values, action) => {
      // console.log("values", values)
      dispatch(updateCompanyBusinessAreaTodo({ 'values': values })).then((res) => update_res(res.payload, action))
    }
  })

  const update_res = (res, action) => {
    if (res && res.status == 200) {
      toast.success(lang.bussiness_area + ' ' + lang.success_update, { position: "bottom-right" })
      action.resetForm()
      setTimeout(() => {
        navigate('/company-area-list')
      }, 1500);
    } else if (res && res.status == 401) {
      localStorage.clear()
      navigate('/login')
    } else if (res && res.status == 400) {
      toast.error("400", { position: "bottom-right" })
    } else {
      toast.error(lang.wrong, { position: "bottom-right" })
    }
  }

  const city_res = (res) => {
    if (res && res.status == 200) {
      setCityLoading(false)
    } else {
      setCityLoading(false)
    }
  }

  const load_city = debounce((e) => {
    if (e) {
      setCityLoading(true)
      dispatch(cityListTodo({ 'search': `search=${e}` })).then((res) => city_res(res.payload))
    }
  }, 500)

  const area_details_res = (res) => {
    if (res && res.status == 200) {
      dispatch(companyListTodo({ 'search': '' })).then((company_res) => {

        if (company_res.payload && company_res.payload.status == 200) {
          dispatch(cityListTodo({ 'search': `search=${res && res.data && res.data.city && res.data.city.name}` })).then((city_res) => {

            if (city_res.payload && city_res.payload.status == 200) {
              setLoading(false)
              setBreakLoading(false)
            } else {
              setBreakLoading(false)
            }
          })
        } else {
          setBreakLoading(false)
        }
      })

    } else if (res && res.status == 401) {
      localStorage.clear()
      navigate('/login')
    } else {
      setBreakLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    setBreakLoading(true)
    dispatch(companyBusinessAreaDetailsTodo({ 'id': state })).then((res) => area_details_res(res.payload))

  }, [])

  return (
    <>
      {loading && breakLoading ?
        <div className="layout">
          <Loader />
        </div>
        :

        loading && !breakLoading ?

          <div className='layout'>
            <div className='text-center'>
              <h5>Something went wrong can't able to load update form</h5>
            </div>
          </div>

          :

          !loading && !breakLoading ?
            <Form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div className="layout">
                <div className='container-fluid'>
                  <div className="row">

                    <div className="col-md-3">
                      <SingleSelect
                        closeMenu={true}
                        label_name={lang.company}
                        // placeholder='Select Comapny'
                        disabled={false}
                        option={company_option ? company_option : []}
                        name='company'
                        defaultValue={company_option && company_option.find((option) => option.value == values.company)}
                        onChange={(e) =>
                          setFieldValue('company', e.value)
                        }
                        onBlur={handleBlur}
                        error={errors.company && touched.company ? (<span className='text-danger form_label' >{errors.company}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <Text
                        label_name={lang.name}
                        placeholder=''
                        disabled={false}
                        name='name'
                        value={values.name || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.name && touched.name ? (<span className='text-danger form_label' >{errors.name}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <TextArea
                        label_name={lang.description}
                        placeholder=''
                        disabled={false}
                        rows={1}
                        name='description'
                        value={values.description || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.description && touched.description ? (<span className='text-danger form_label' >{errors.description}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <TextArea
                        label_name={lang.address}
                        placeholder=''
                        disabled={false}
                        rows={1}
                        name='address'
                        value={values.address || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.address && touched.address ? (<span className='text-danger form_label' >{errors.address}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <Text
                        label_name={lang.code}
                        placeholder=''
                        disabled={false}
                        name='code'
                        value={values.code || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.code && touched.code ? (<span className='text-danger form_label' >{errors.code}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <Text
                        label_name={lang.postal_code}
                        placeholder=''
                        disabled={false}
                        name='postalCode'
                        value={values.postalCode || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.postalCode && touched.postalCode ? (<span className='text-danger form_label' >{errors.postalCode}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <Email
                        label_name={lang.email}
                        placeholder=''
                        disabled={false}
                        name='email'
                        value={values.email || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.email && touched.email ? (<span className='text-danger form_label' >{errors.email}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <Text
                        label_name={lang.phone}
                        placeholder=''
                        disabled={false}
                        name='phone'
                        value={values.phone || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.phone && touched.phone ? (<span className='text-danger form_label' >{errors.phone}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <Text
                        label_name={lang.mobile_no}
                        placeholder=''
                        disabled={false}
                        name='mobile'
                        value={values.mobile || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.mobile && touched.mobile ? (<span className='text-danger form_label' >{errors.mobile}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <SingleSelect
                        closeMenu={true}
                        label_name={lang.city}
                        // placeholder='Select City'
                        disabled={false}
                        option={city_option ? city_option : []}
                        name='city'
                        defaultValue={city_option && city_option.find((option) => option.value == values.city)}
                        onChange={(e) =>
                          setFieldValue('city', e.value)
                        }
                        onBlur={handleBlur}
                        onInputChange={(e) => load_city(e)}
                        loading={cityLoading}
                        error={errors.city && touched.city ? (<span className='text-danger form_label' >{errors.city}</span>) : null}
                      />
                    </div>

                    <div className="col-md-3">
                      <SelectStatus
                        closeMenu={true}
                        label_name={lang.status}
                        // placeholder='Select Status'
                        disabled={false}
                        name='status'
                        defaultValue={values.status}
                        onChange={(e) =>
                          setFieldValue('status', e.value)
                        }
                        onBlur={handleBlur}
                        error={errors.status && touched.status ? (<span className='text-danger form_label' >{errors.status}</span>) : null}
                      />
                    </div>

                    <div className="text-end">
                      <SaveButton
                        button_name={lang.update}
                      />
                    </div>

                  </div>
                </div>
              </div>
            </Form>
            : ''
      }

      <ToastContainer />
    </>
  )
}
