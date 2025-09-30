import React, { useState } from 'react'




const ResultPage = () => {
    const [mark, setMark] = useState(0);
  return (
    <div>
      <div className="w-75">
                  <h4>YOU GOT</h4>
                  <h4>{mark}/5</h4>
                  <div className="flex gap-2 m-2">
                    <div className="p-1 w-[250px] h-[180px] border">
                      <label>Your Answer</label>
                      <div
                        className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                          isSelected.selecte1 == test[0]?.answer
                            ? "bg-green-100 border-green-500"
                            : "bg-danger-200 border-danger-500"
                        }`}
                      >
                        <Checkbox checked={true} id="terms2" disabled />
                        <Label>{isSelected.selecte1}</Label>
                      </div>
                      <Label>Currect Answer</Label>
                      <div
                        className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                      >
                        <Checkbox checked={true} id="terms2" disabled />
                        <Label>{test[0]?.answer}</Label>
                      </div>
                    </div>
                    <div className="p-1 w-[250px] h-[180px] border">
                      <Label>Your Answer</Label>
                      <div
                        className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                          isSelected.selecte2 == test[1]?.answer
                            ? "bg-green-100 border-green-500"
                            : "bg-danger-200 border-danger-500"
                        }`}
                      >
                        <Checkbox checked={true} id="terms2" disabled />
                        <Label>{isSelected.selecte2}</Label>
                      </div>
                      <Label>Currect Answer</Label>
                      <div
                        className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                      >
                        {/* <Checkbox checked={true} id="terms2" disabled /> */}
                        <label>{test[1]?.answer}</label>
                      </div>
                    </div>
                    <div className="p-1 w-[250px] h-[180px] border">
                      <label>Your Answer</label>
                      <div
                        className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                          isSelected.selecte3 == test[2]?.answer
                            ? "bg-green-100 border-green-500"
                            : "bg-danger-200 border-danger-500"
                        }`}
                      >
                        {/* <Checkbox checked={true} id="terms2" disabled /> */}
                        <label>{isSelected.selecte3}</label>
                      </div>
                      <label>Currect Answer</label>
                      <div
                        className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                      >
                        {/* <Checkbox checked={true} id="terms2" disabled /> */}
                        <label>{test[2]?.answer}</label>
                      </div>
                    </div>
                    <div className="p-1 w-[250px] h-[180px] border">
                      <label>Your Answer</label>
                      <div
                        className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                          isSelected.selecte4 == test[3]?.answer
                            ? "bg-green-100 border-green-500"
                            : "bg-danger-200 border-danger-500"
                        }`}
                      >
                        {/* <Checkbox checked={true} id="terms2" disabled /> */}
                        <label>{isSelected.selecte4}</label>
                      </div>
                      <label>Currect Answer</label>
                      <div
                        className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                      >
                        {/* <Checkbox checked={true} id="terms2" disabled /> */}
                        <label>{test[3]?.answer}</label>
                      </div>
                    </div>
                    <div className="p-1 w-[250px] h-[180px] border">
                      <label>Your Answer</label>
                      <div
                        className={`w-full flex  items-center gap-3 p-2 py-3 text-left  rounded-lg border ${
                          isSelected.selecte5 == test[4]?.answer
                            ? "bg-green-100 border-green-500"
                            : "bg-danger-200 border-danger-500"
                        }`}
                      >
                        {/* <Checkbox checked={true} id="terms2" disabled /> */}
                        <label>{isSelected.selecte5}</label>
                      </div>
                      <label>Currect Answer</label>
                      <div
                        className={`w-full flex  items-center gap-3 px-2 py-3 text-left  rounded-lg border bg-green-100 border-green-500`}
                      >
                        {/* <Checkbox checked={true} id="terms2" disabled /> */}
                        <label>{test[4]?.answer}</label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => navigate(-1)}
                      className="bg-teal-400 hover:bg-teal-400"
                    >
                      back to class
                    </button>
                  </div>
                </div>
    </div>
  )
}

export default React.memo(ResultPage)
