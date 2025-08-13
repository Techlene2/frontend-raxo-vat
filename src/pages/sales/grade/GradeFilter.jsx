import React, { useState } from 'react'
import { GradeImport } from './Import.js'
const { Offcanvas, Form, Button, useNavigate, useDispatch, parseLinkHeader, gradeListTodo, lang } = GradeImport

export default function GradeFilter(props) {
  const { filter, setFilter, setTableLoading, setCurrentPage, pageSize, setHeaderLink, setTotalRecord, bool, setBool } = props
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClose = () => setFilter(false)

  const apply_filter = () => {
    setFilter(false)
    setTableLoading(true)
    setCurrentPage(0)
    dispatch(gradeListTodo({ 'search': `pageSize=${pageSize}&pageNo=${0}&search=${search}` })).then((res) => grade_res(res.payload))
  }

  const clear_filter = () => {
    setBool(!bool)
    setSearch('')
    setFilter(false)
  }

  const grade_res = (res) => {
    if (res && res.status == 200) {
      const parsed = parseLinkHeader(res.headers.link)
      setHeaderLink(parsed)
      setTotalRecord(parseInt(res.headers.get('x-Total-Count')))
      setTableLoading(false)
      // setLoading(false)
    } else if (res && res.status == 401) {
      localStorage.clear()
      navigate('/login')
    } else {
      // setLoading(false)
    }
  }

  return (
    <>
      <Offcanvas show={filter} onHide={handleClose} placement={localStorage.getItem('lang_key') == 'ar' ? 'start' : 'end'} backdrop="static" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: '#21263c' }}> {lang.grade + ' ' + lang.filter}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>

          <Form.Group className="" controlId="text">
            <Form.Label className='form_label'>{lang.search}</Form.Label>
            <Form.Control
              type="text"
              placeholder=''
              disabled={false}
              className='form_input'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>

          <div style={{ position: "absolute", bottom: 10, right: 10 }}>
            <Button
              type='button'
              variant="primary"
              size='sm'
              onClick={() => apply_filter()}
            >
              {lang.apply}
            </Button>

            <Button
              type='button'
              variant="secondary"
              size='sm'
              onClick={() => clear_filter()}
              className={localStorage.getItem('lang_key') == 'ar' ? 'me-1' : 'ms-1'}
            >
              {lang.clear}
            </Button>
          </div>

        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

