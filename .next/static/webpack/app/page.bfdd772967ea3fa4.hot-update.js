"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./view/charity/index.tsx":
/*!********************************!*\
  !*** ./view/charity/index.tsx ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Charity: function() { return /* binding */ Charity; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=Col,Popover,Row,Table!=!antd */ \"(app-pages-browser)/./node_modules/antd/es/popover/index.js\");\n/* harmony import */ var _barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=Col,Popover,Row,Table!=!antd */ \"(app-pages-browser)/./node_modules/antd/es/row/index.js\");\n/* harmony import */ var _barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=Col,Popover,Row,Table!=!antd */ \"(app-pages-browser)/./node_modules/antd/es/col/index.js\");\n/* harmony import */ var _barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=Col,Popover,Row,Table!=!antd */ \"(app-pages-browser)/./node_modules/antd/es/table/index.js\");\n/* harmony import */ var _components_pagetitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/pagetitle */ \"(app-pages-browser)/./components/pagetitle.tsx\");\n/* harmony import */ var _components_common_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/common/button */ \"(app-pages-browser)/./components/common/button.tsx\");\n/* harmony import */ var _components_common_graph__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/common/graph */ \"(app-pages-browser)/./components/common/graph.tsx\");\n/* harmony import */ var _components_form_input__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/form/input */ \"(app-pages-browser)/./components/form/input.tsx\");\n/* harmony import */ var _components_common_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/common/tag */ \"(app-pages-browser)/./components/common/tag.tsx\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nconst onChange = (pagination, filters, sorter, extra)=>{\n    console.log(\"params\", pagination, filters, sorter, extra);\n};\nconst Charity = ()=>{\n    _s();\n    const [openPopoverIndex, setOpenPopoverIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const handlePopoverOpen = (index)=>{\n        setOpenPopoverIndex(index === openPopoverIndex ? null : index);\n    };\n    const columns = [\n        {\n            title: \"Date\",\n            dataIndex: \"date\"\n        },\n        {\n            title: \"Category\",\n            dataIndex: \"category\"\n        },\n        {\n            title: \"Amount\",\n            dataIndex: \"amount\",\n            sorter: {\n                compare: (a, b)=>a.math - b.math,\n                multiple: 2\n            }\n        },\n        {\n            title: \"Organisation\",\n            dataIndex: \"organisation\"\n        },\n        {\n            title: \"Status\",\n            dataIndex: \"status\"\n        },\n        {\n            title: \"\",\n            dataIndex: \"\",\n            key: \"x\",\n            render: (text, record, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                    content: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        style: {\n                            width: \"130px\",\n                            padding: \"5px\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                onClick: ()=>handlePopoverOpen(index),\n                                style: {\n                                    display: \"block\",\n                                    marginBottom: \"12px\"\n                                },\n                                children: \"Edit\"\n                            }, void 0, false, {\n                                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                lineNumber: 69,\n                                columnNumber: 15\n                            }, void 0),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                onClick: ()=>handlePopoverOpen(index),\n                                style: {\n                                    display: \"block\"\n                                },\n                                children: \"Delete\"\n                            }, void 0, false, {\n                                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                lineNumber: 75,\n                                columnNumber: 15\n                            }, void 0)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 13\n                    }, void 0),\n                    trigger: \"click\",\n                    visible: openPopoverIndex === index,\n                    onVisibleChange: (visible)=>{\n                        if (!visible) {\n                            setOpenPopoverIndex(null);\n                        }\n                    },\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_common_button__WEBPACK_IMPORTED_MODULE_3__.PrimaryButton, {\n                        text: \"\",\n                        variant: \"info\",\n                        onClick: ()=>handlePopoverOpen(index)\n                    }, void 0, false, {\n                        fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                        lineNumber: 91,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                    lineNumber: 66,\n                    columnNumber: 9\n                }, undefined)\n        }\n    ];\n    const data = [\n        {\n            key: \"3\",\n            date: \"07/12/2023\",\n            category: \"Food\",\n            amount: 322332,\n            organisation: \"Keto India\",\n            status: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_common_tag__WEBPACK_IMPORTED_MODULE_6__.CustomTag, {\n                variant: \"success\",\n                title: \"Completed\"\n            }, void 0, false, {\n                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                lineNumber: 108,\n                columnNumber: 15\n            }, undefined)\n        },\n        {\n            key: \"4\",\n            date: \"03/11/2023\",\n            category: \"Food\",\n            amount: 2323,\n            organisation: \"Keto India\",\n            status: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_common_tag__WEBPACK_IMPORTED_MODULE_6__.CustomTag, {\n                variant: \"success\",\n                title: \"Completed\"\n            }, void 0, false, {\n                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                lineNumber: 116,\n                columnNumber: 15\n            }, undefined)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"common-panel-wrapper\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                    justify: \"space-between\",\n                    style: {\n                        alignItems: \"center\"\n                    },\n                    className: \"p-15\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                            span: 12,\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_pagetitle__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                title: \"Charity\"\n                            }, void 0, false, {\n                                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                lineNumber: 129,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                            lineNumber: 128,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                            span: 12,\n                            style: {\n                                textAlign: \"right\"\n                            },\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_common_button__WEBPACK_IMPORTED_MODULE_3__.PrimaryButton, {\n                                text: \"Add Data\",\n                                variant: \"primary\"\n                            }, void 0, false, {\n                                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                lineNumber: 132,\n                                columnNumber: 13\n                            }, undefined)\n                        }, void 0, false, {\n                            fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                            lineNumber: 131,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                    lineNumber: 123,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"gray-box p-15\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                        gutter: [\n                            0,\n                            12\n                        ],\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                span: 24,\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_common_graph__WEBPACK_IMPORTED_MODULE_4__.DisplayGraph, {}, void 0, false, {\n                                    fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                    lineNumber: 138,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                lineNumber: 137,\n                                columnNumber: 13\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                span: 24,\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    style: {\n                                        background: \"#fff\",\n                                        padding: \"15px\"\n                                    },\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_form_input__WEBPACK_IMPORTED_MODULE_5__.FormInput, {\n                                            type: \"search\",\n                                            placeholder: \"Search\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                            lineNumber: 142,\n                                            columnNumber: 17\n                                        }, undefined),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_Col_Popover_Row_Table_antd__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                            columns: columns,\n                                            dataSource: data,\n                                            onChange: onChange\n                                        }, void 0, false, {\n                                            fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                            lineNumber: 143,\n                                            columnNumber: 17\n                                        }, undefined)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                    lineNumber: 141,\n                                    columnNumber: 15\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                                lineNumber: 140,\n                                columnNumber: 13\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                        lineNumber: 136,\n                        columnNumber: 11\n                    }, undefined)\n                }, void 0, false, {\n                    fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n                    lineNumber: 135,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/chetanmane/Documents/fleapo/tagmango-frontend-creator/view/charity/index.tsx\",\n            lineNumber: 121,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false);\n};\n_s(Charity, \"RLPZb09VIMkgl88btsKOehXTauA=\");\n_c = Charity;\nvar _c;\n$RefreshReg$(_c, \"Charity\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3ZpZXcvY2hhcml0eS9pbmRleC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1E7QUFFRztBQUNZO0FBQ0Y7QUFDTDtBQUNBO0FBYXhELE1BQU1XLFdBQTZDLENBQ2pEQyxZQUNBQyxTQUNBQyxRQUNBQztJQUVBQyxRQUFRQyxHQUFHLENBQUMsVUFBVUwsWUFBWUMsU0FBU0MsUUFBUUM7QUFDckQ7QUFFTyxNQUFNRyxVQUFVOztJQUNyQixNQUFNLENBQUNDLGtCQUFrQkMsb0JBQW9CLEdBQUduQiwrQ0FBUUEsQ0FBZ0I7SUFFeEUsTUFBTW9CLG9CQUFvQixDQUFDQztRQUN6QkYsb0JBQW9CRSxVQUFVSCxtQkFBbUIsT0FBT0c7SUFDMUQ7SUFDQSxNQUFNQyxVQUFpQztRQUNyQztZQUNFQyxPQUFPO1lBQ1BDLFdBQVc7UUFDYjtRQUNBO1lBQ0VELE9BQU87WUFDUEMsV0FBVztRQUNiO1FBQ0E7WUFDRUQsT0FBTztZQUNQQyxXQUFXO1lBQ1hYLFFBQVE7Z0JBQ05ZLFNBQVMsQ0FBQ0MsR0FBR0MsSUFBTUQsRUFBRUUsSUFBSSxHQUFHRCxFQUFFQyxJQUFJO2dCQUNsQ0MsVUFBVTtZQUNaO1FBQ0Y7UUFDQTtZQUNFTixPQUFPO1lBQ1BDLFdBQVc7UUFDYjtRQUNBO1lBQ0VELE9BQU87WUFDUEMsV0FBVztRQUNiO1FBQ0E7WUFDRUQsT0FBTztZQUNQQyxXQUFXO1lBQ1hNLEtBQUs7WUFDTEMsUUFBUSxDQUFDQyxNQUFNQyxRQUFRWixzQkFDckIsOERBQUNqQix5RkFBT0E7b0JBQ044Qix1QkFDRSw4REFBQ0M7d0JBQUlDLE9BQU87NEJBQUVDLE9BQU87NEJBQVNDLFNBQVM7d0JBQU07OzBDQUMzQyw4REFBQ0M7Z0NBQ0NDLFNBQVMsSUFBTXBCLGtCQUFrQkM7Z0NBQ2pDZSxPQUFPO29DQUFFSyxTQUFTO29DQUFTQyxjQUFjO2dDQUFPOzBDQUNqRDs7Ozs7OzBDQUdELDhEQUFDSDtnQ0FDQ0MsU0FBUyxJQUFNcEIsa0JBQWtCQztnQ0FDakNlLE9BQU87b0NBQUVLLFNBQVM7Z0NBQVE7MENBQzNCOzs7Ozs7Ozs7Ozs7b0JBS0xFLFNBQVE7b0JBQ1JDLFNBQVMxQixxQkFBcUJHO29CQUM5QndCLGlCQUFpQixDQUFDRDt3QkFDaEIsSUFBSSxDQUFDQSxTQUFTOzRCQUNaekIsb0JBQW9CO3dCQUN0QjtvQkFDRjs4QkFFQSw0RUFBQ2Isb0VBQWFBO3dCQUNaMEIsTUFBSzt3QkFDTGMsU0FBUTt3QkFDUk4sU0FBUyxJQUFNcEIsa0JBQWtCQzs7Ozs7Ozs7Ozs7UUFJekM7S0FDRDtJQUVELE1BQU0wQixPQUFtQjtRQUN2QjtZQUNFakIsS0FBSztZQUNMa0IsTUFBTTtZQUNOQyxVQUFVO1lBQ1ZDLFFBQVE7WUFDUkMsY0FBYztZQUNkQyxzQkFBUSw4REFBQzNDLDZEQUFTQTtnQkFBQ3FDLFNBQVE7Z0JBQVV2QixPQUFNOzs7Ozs7UUFDN0M7UUFDQTtZQUNFTyxLQUFLO1lBQ0xrQixNQUFNO1lBQ05DLFVBQVU7WUFDVkMsUUFBUTtZQUNSQyxjQUFjO1lBQ2RDLHNCQUFRLDhEQUFDM0MsNkRBQVNBO2dCQUFDcUMsU0FBUTtnQkFBVXZCLE9BQU07Ozs7OztRQUM3QztLQUNEO0lBQ0QscUJBQ0U7a0JBQ0UsNEVBQUNZO1lBQUlrQixXQUFVOzs4QkFFYiw4REFBQ25ELHlGQUFHQTtvQkFDRm9ELFNBQVM7b0JBQ1RsQixPQUFPO3dCQUFFbUIsWUFBWTtvQkFBUztvQkFDOUJGLFdBQVU7O3NDQUVWLDhEQUFDcEQseUZBQUdBOzRCQUFDc0MsTUFBTTtzQ0FDVCw0RUFBQ2xDLDZEQUFTQTtnQ0FBQ2tCLE9BQU07Ozs7Ozs7Ozs7O3NDQUVuQiw4REFBQ3RCLHlGQUFHQTs0QkFBQ3NDLE1BQU07NEJBQUlILE9BQU87Z0NBQUVvQixXQUFXOzRCQUFRO3NDQUN6Qyw0RUFBQ2xELG9FQUFhQTtnQ0FBQzBCLE1BQUs7Z0NBQVdjLFNBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUczQyw4REFBQ1g7b0JBQUlrQixXQUFVOzhCQUNiLDRFQUFDbkQseUZBQUdBO3dCQUFDdUQsUUFBUTs0QkFBQzs0QkFBRzt5QkFBRzs7MENBQ2xCLDhEQUFDeEQseUZBQUdBO2dDQUFDc0MsTUFBTTswQ0FDVCw0RUFBQ2hDLGtFQUFZQTs7Ozs7Ozs7OzswQ0FFZiw4REFBQ04seUZBQUdBO2dDQUFDc0MsTUFBTTswQ0FDVCw0RUFBQ0o7b0NBQUlDLE9BQU87d0NBQUVzQixZQUFZO3dDQUFRcEIsU0FBUztvQ0FBTzs7c0RBQ2hELDhEQUFDOUIsNkRBQVNBOzRDQUFDbUQsTUFBSzs0Q0FBU0MsYUFBWTs7Ozs7O3NEQUNyQyw4REFBQ3pELDBGQUFLQTs0Q0FDSm1CLFNBQVNBOzRDQUNUdUMsWUFBWWQ7NENBQ1pyQyxVQUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFTNUIsRUFBRTtHQTdIV087S0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vdmlldy9jaGFyaXR5L2luZGV4LnRzeD84ODU5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENvbCwgUm93LCBUYWJsZSwgUG9wb3ZlciB9IGZyb20gJ2FudGQnO1xuXG5pbXBvcnQgUGFnZVRpdGxlIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvcGFnZXRpdGxlJztcbmltcG9ydCB7IFByaW1hcnlCdXR0b24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbW1vbi9idXR0b24nO1xuaW1wb3J0IHsgRGlzcGxheUdyYXBoIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb21tb24vZ3JhcGgnO1xuaW1wb3J0IHsgRm9ybUlucHV0IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9mb3JtL2lucHV0JztcbmltcG9ydCB7IEN1c3RvbVRhZyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29tbW9uL3RhZyc7XG5pbXBvcnQgdHlwZSB7IENvbHVtbnNUeXBlLCBUYWJsZVByb3BzIH0gZnJvbSAnYW50ZC9lcy90YWJsZSc7XG5cbmludGVyZmFjZSBEYXRhVHlwZSB7XG4gIFt4OiBzdHJpbmddOiBhbnk7XG4gIGtleTogUmVhY3QuS2V5O1xuICBkYXRlOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIGFtb3VudDogbnVtYmVyO1xuICBvcmdhbmlzYXRpb246IHN0cmluZztcbiAgc3RhdHVzOiBhbnk7XG59XG5cbmNvbnN0IG9uQ2hhbmdlOiBUYWJsZVByb3BzPERhdGFUeXBlPlsnb25DaGFuZ2UnXSA9IChcbiAgcGFnaW5hdGlvbixcbiAgZmlsdGVycyxcbiAgc29ydGVyLFxuICBleHRyYVxuKSA9PiB7XG4gIGNvbnNvbGUubG9nKCdwYXJhbXMnLCBwYWdpbmF0aW9uLCBmaWx0ZXJzLCBzb3J0ZXIsIGV4dHJhKTtcbn07XG5cbmV4cG9ydCBjb25zdCBDaGFyaXR5ID0gKCkgPT4ge1xuICBjb25zdCBbb3BlblBvcG92ZXJJbmRleCwgc2V0T3BlblBvcG92ZXJJbmRleF0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBoYW5kbGVQb3BvdmVyT3BlbiA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgc2V0T3BlblBvcG92ZXJJbmRleChpbmRleCA9PT0gb3BlblBvcG92ZXJJbmRleCA/IG51bGwgOiBpbmRleCk7XG4gIH07XG4gIGNvbnN0IGNvbHVtbnM6IENvbHVtbnNUeXBlPERhdGFUeXBlPiA9IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0RhdGUnLFxuICAgICAgZGF0YUluZGV4OiAnZGF0ZScsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NhdGVnb3J5JyxcbiAgICAgIGRhdGFJbmRleDogJ2NhdGVnb3J5JyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQW1vdW50JyxcbiAgICAgIGRhdGFJbmRleDogJ2Ftb3VudCcsXG4gICAgICBzb3J0ZXI6IHtcbiAgICAgICAgY29tcGFyZTogKGEsIGIpID0+IGEubWF0aCAtIGIubWF0aCxcbiAgICAgICAgbXVsdGlwbGU6IDIsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdPcmdhbmlzYXRpb24nLFxuICAgICAgZGF0YUluZGV4OiAnb3JnYW5pc2F0aW9uJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnU3RhdHVzJyxcbiAgICAgIGRhdGFJbmRleDogJ3N0YXR1cycsXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJycsXG4gICAgICBkYXRhSW5kZXg6ICcnLFxuICAgICAga2V5OiAneCcsXG4gICAgICByZW5kZXI6ICh0ZXh0LCByZWNvcmQsIGluZGV4KSA9PiAoXG4gICAgICAgIDxQb3BvdmVyXG4gICAgICAgICAgY29udGVudD17XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnMTMwcHgnLCBwYWRkaW5nOiAnNXB4JyB9fT5cbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVQb3BvdmVyT3BlbihpbmRleCl9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJywgbWFyZ2luQm90dG9tOiAnMTJweCcgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIEVkaXRcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVBvcG92ZXJPcGVuKGluZGV4KX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBEZWxldGVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgfVxuICAgICAgICAgIHRyaWdnZXI9J2NsaWNrJ1xuICAgICAgICAgIHZpc2libGU9e29wZW5Qb3BvdmVySW5kZXggPT09IGluZGV4fVxuICAgICAgICAgIG9uVmlzaWJsZUNoYW5nZT17KHZpc2libGUpID0+IHtcbiAgICAgICAgICAgIGlmICghdmlzaWJsZSkge1xuICAgICAgICAgICAgICBzZXRPcGVuUG9wb3ZlckluZGV4KG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICA8UHJpbWFyeUJ1dHRvblxuICAgICAgICAgICAgdGV4dD0nJ1xuICAgICAgICAgICAgdmFyaWFudD0naW5mbydcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVBvcG92ZXJPcGVuKGluZGV4KX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L1BvcG92ZXI+XG4gICAgICApLFxuICAgIH0sXG4gIF07XG5cbiAgY29uc3QgZGF0YTogRGF0YVR5cGVbXSA9IFtcbiAgICB7XG4gICAgICBrZXk6ICczJyxcbiAgICAgIGRhdGU6ICcwNy8xMi8yMDIzJyxcbiAgICAgIGNhdGVnb3J5OiAnRm9vZCcsXG4gICAgICBhbW91bnQ6IDMyMjMzMixcbiAgICAgIG9yZ2FuaXNhdGlvbjogJ0tldG8gSW5kaWEnLFxuICAgICAgc3RhdHVzOiA8Q3VzdG9tVGFnIHZhcmlhbnQ9J3N1Y2Nlc3MnIHRpdGxlPSdDb21wbGV0ZWQnIC8+LFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAnNCcsXG4gICAgICBkYXRlOiAnMDMvMTEvMjAyMycsXG4gICAgICBjYXRlZ29yeTogJ0Zvb2QnLFxuICAgICAgYW1vdW50OiAyMzIzLFxuICAgICAgb3JnYW5pc2F0aW9uOiAnS2V0byBJbmRpYScsXG4gICAgICBzdGF0dXM6IDxDdXN0b21UYWcgdmFyaWFudD0nc3VjY2VzcycgdGl0bGU9J0NvbXBsZXRlZCcgLz4sXG4gICAgfSxcbiAgXTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbW1vbi1wYW5lbC13cmFwcGVyJz5cbiAgICAgICAgey8qIFBhZ2UgVGl0bGUgKi99XG4gICAgICAgIDxSb3dcbiAgICAgICAgICBqdXN0aWZ5PXsnc3BhY2UtYmV0d2Vlbid9XG4gICAgICAgICAgc3R5bGU9e3sgYWxpZ25JdGVtczogJ2NlbnRlcicgfX1cbiAgICAgICAgICBjbGFzc05hbWU9J3AtMTUnXG4gICAgICAgID5cbiAgICAgICAgICA8Q29sIHNwYW49ezEyfT5cbiAgICAgICAgICAgIDxQYWdlVGl0bGUgdGl0bGU9J0NoYXJpdHknIC8+XG4gICAgICAgICAgPC9Db2w+XG4gICAgICAgICAgPENvbCBzcGFuPXsxMn0gc3R5bGU9e3sgdGV4dEFsaWduOiAncmlnaHQnIH19PlxuICAgICAgICAgICAgPFByaW1hcnlCdXR0b24gdGV4dD0nQWRkIERhdGEnIHZhcmlhbnQ9J3ByaW1hcnknIC8+XG4gICAgICAgICAgPC9Db2w+XG4gICAgICAgIDwvUm93PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nZ3JheS1ib3ggcC0xNSc+XG4gICAgICAgICAgPFJvdyBndXR0ZXI9e1swLCAxMl19PlxuICAgICAgICAgICAgPENvbCBzcGFuPXsyNH0+XG4gICAgICAgICAgICAgIDxEaXNwbGF5R3JhcGggLz5cbiAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgICAgPENvbCBzcGFuPXsyNH0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgYmFja2dyb3VuZDogJyNmZmYnLCBwYWRkaW5nOiAnMTVweCcgfX0+XG4gICAgICAgICAgICAgICAgPEZvcm1JbnB1dCB0eXBlPSdzZWFyY2gnIHBsYWNlaG9sZGVyPSdTZWFyY2gnIC8+XG4gICAgICAgICAgICAgICAgPFRhYmxlXG4gICAgICAgICAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgICAgICAgICAgZGF0YVNvdXJjZT17ZGF0YX1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvQ29sPlxuICAgICAgICAgIDwvUm93PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVN0YXRlIiwiQ29sIiwiUm93IiwiVGFibGUiLCJQb3BvdmVyIiwiUGFnZVRpdGxlIiwiUHJpbWFyeUJ1dHRvbiIsIkRpc3BsYXlHcmFwaCIsIkZvcm1JbnB1dCIsIkN1c3RvbVRhZyIsIm9uQ2hhbmdlIiwicGFnaW5hdGlvbiIsImZpbHRlcnMiLCJzb3J0ZXIiLCJleHRyYSIsImNvbnNvbGUiLCJsb2ciLCJDaGFyaXR5Iiwib3BlblBvcG92ZXJJbmRleCIsInNldE9wZW5Qb3BvdmVySW5kZXgiLCJoYW5kbGVQb3BvdmVyT3BlbiIsImluZGV4IiwiY29sdW1ucyIsInRpdGxlIiwiZGF0YUluZGV4IiwiY29tcGFyZSIsImEiLCJiIiwibWF0aCIsIm11bHRpcGxlIiwia2V5IiwicmVuZGVyIiwidGV4dCIsInJlY29yZCIsImNvbnRlbnQiLCJkaXYiLCJzdHlsZSIsIndpZHRoIiwicGFkZGluZyIsInNwYW4iLCJvbkNsaWNrIiwiZGlzcGxheSIsIm1hcmdpbkJvdHRvbSIsInRyaWdnZXIiLCJ2aXNpYmxlIiwib25WaXNpYmxlQ2hhbmdlIiwidmFyaWFudCIsImRhdGEiLCJkYXRlIiwiY2F0ZWdvcnkiLCJhbW91bnQiLCJvcmdhbmlzYXRpb24iLCJzdGF0dXMiLCJjbGFzc05hbWUiLCJqdXN0aWZ5IiwiYWxpZ25JdGVtcyIsInRleHRBbGlnbiIsImd1dHRlciIsImJhY2tncm91bmQiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJkYXRhU291cmNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./view/charity/index.tsx\n"));

/***/ })

});