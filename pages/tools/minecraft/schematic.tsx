// 'use client';

export default function SchematicTool() {

    return (<b>Aici sunt banii dumneavoastra</b>); 

}

// import { useState, useEffect } from 'react';
// import Papa from 'papaparse';

// export default function CSVProjectManager() {
//   const [projects, setProjects] = useState([]);
//   const [activeProjectId, setActiveProjectId] = useState(null);

//   // Load projects from storage on mount
//   useEffect(() => {
//     loadProjects();
//   }, []);

//   const loadProjects = async () => {
//     try {
//       const result = await window.storage.list('project:');
//       if (result && result.keys) {
//         const loadedProjects = await Promise.all(
//           result.keys.map(async (key) => {
//             try {
//               const data = await window.storage.get(key);
//               return data ? JSON.parse(data.value) : null;
//             } catch {
//               return null;
//             }
//           })
//         );
//         const validProjects = loadedProjects.filter(p => p !== null);
//         setProjects(validProjects);
//         if (validProjects.length > 0 && !activeProjectId) {
//           setActiveProjectId(validProjects[0].id);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading projects:', error);
//     }
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     Papa.parse(file, {
//       header: true,
//       skipEmptyLines: true,
//       dynamicTyping: true,
//       complete: async (results) => {
//         if (results.data.length > 0) {
//           const projectId = `project:${Date.now()}`;
//           const newProject = {
//             id: projectId,
//             name: file.name,
//             createdAt: new Date().toISOString(),
//             headers: Object.keys(results.data[0]),
//             rows: results.data.map((row, index) => ({
//               id: index,
//               data: row,
//               checked: false
//             }))
//           };

//           try {
//             await window.storage.set(projectId, JSON.stringify(newProject));
//             setProjects([...projects, newProject]);
//             setActiveProjectId(projectId);
//           } catch (error) {
//             console.error('Error saving project:', error);
//             alert('Error saving project');
//           }
//         }
//       },
//       error: (error) => {
//         console.error('Error parsing CSV:', error);
//         alert('Error parsing CSV file');
//       }
//     });

//     e.target.value = '';
//   };

//   const toggleCheckmark = async (rowId) => {
//     const project = projects.find(p => p.id === activeProjectId);
//     if (!project) return;

//     const updatedRows = project.rows.map(row =>
//       row.id === rowId ? { ...row, checked: !row.checked } : row
//     );

//     const updatedProject = { ...project, rows: updatedRows };

//     try {
//       await window.storage.set(activeProjectId, JSON.stringify(updatedProject));
//       setProjects(projects.map(p => p.id === activeProjectId ? updatedProject : p));
//     } catch (error) {
//       console.error('Error updating checkmark:', error);
//     }
//   };

//   const deleteProject = async (projectId) => {
//     if (!confirm('Are you sure you want to delete this project?')) return;

//     try {
//       await window.storage.delete(projectId);
//       const newProjects = projects.filter(p => p.id !== projectId);
//       setProjects(newProjects);
//       if (activeProjectId === projectId) {
//         setActiveProjectId(newProjects.length > 0 ? newProjects[0].id : null);
//       }
//     } catch (error) {
//       console.error('Error deleting project:', error);
//     }
//   };

//   const activeProject = projects.find(p => p.id === activeProjectId);
//   const checkedCount = activeProject?.rows.filter(r => r.checked).length || 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <h1 className="text-3xl font-bold text-gray-800 mb-4">CSV Project Manager</h1>
          
//           <label className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer transition-colors">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//             New Project
//             <input
//               type="file"
//               accept=".csv"
//               onChange={handleFileUpload}
//               className="hidden"
//             />
//           </label>
//         </div>

//         <div className="grid grid-cols-12 gap-6">
//           {/* Sidebar */}
//           <div className="col-span-3">
//             <div className="bg-white rounded-lg shadow-lg p-4">
//               <h2 className="text-lg font-semibold text-gray-800 mb-4">Projects</h2>
//               {projects.length === 0 ? (
//                 <p className="text-gray-500 text-sm">No projects yet</p>
//               ) : (
//                 <div className="space-y-2">
//                   {projects.map(project => (
//                     <div
//                       key={project.id}
//                       className={`p-3 rounded-lg cursor-pointer transition-colors group ${
//                         activeProjectId === project.id
//                           ? 'bg-indigo-100 border-2 border-indigo-500'
//                           : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
//                       }`}
//                     >
//                       <div
//                         onClick={() => setActiveProjectId(project.id)}
//                         className="flex-1"
//                       >
//                         <p className="font-medium text-gray-800 text-sm truncate">
//                           {project.name}
//                         </p>
//                         <p className="text-xs text-gray-500 mt-1">
//                           {project.rows.length} rows
//                         </p>
//                       </div>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           deleteProject(project.id);
//                         }}
//                         className="mt-2 text-red-500 hover:text-red-700 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="col-span-9">
//             {activeProject ? (
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 <div className="p-4 bg-indigo-600 text-white">
//                   <h2 className="text-xl font-semibold">{activeProject.name}</h2>
//                   <p className="text-sm mt-1">
//                     {checkedCount} of {activeProject.rows.length} rows checked
//                   </p>
//                 </div>
                
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-100">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200 w-16">
//                           Done
//                         </th>
//                         {activeProject.headers.map((header, i) => (
//                           <th
//                             key={i}
//                             className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b-2 border-gray-200"
//                           >
//                             {header}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {activeProject.rows.map((row) => (
//                         <tr
//                           key={row.id}
//                           className={`hover:bg-gray-50 transition-colors ${
//                             row.checked ? 'bg-green-50' : ''
//                           }`}
//                         >
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <input
//                               type="checkbox"
//                               checked={row.checked}
//                               onChange={() => toggleCheckmark(row.id)}
//                               className="w-5 h-5 text-indigo-600 rounded cursor-pointer"
//                             />
//                           </td>
//                           {activeProject.headers.map((header, colIndex) => (
//                             <td
//                               key={colIndex}
//                               className={`px-6 py-4 whitespace-nowrap text-sm ${
//                                 row.checked ? 'text-gray-500 line-through' : 'text-gray-900'
//                               }`}
//                             >
//                               {row.data[header] ?? ''}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-lg shadow-lg p-12 text-center">
//                 <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//                 <p className="text-gray-500 text-lg">No project selected. Upload a CSV file to create a new project.</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }