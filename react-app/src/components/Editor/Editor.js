import React from 'react';
import clsx from 'clsx';

// Lexical imports
import {
	$getRoot,
	$getSelection,
	$isRangeSelection,
	FORMAT_TEXT_COMMAND,
	FORMAT_ELEMENT_COMMAND,
	UNDO_COMMAND,
	REDO_COMMAND,
} from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { mergeRegister } from '@lexical/utils';
import './editorStyles.css';

// Font awesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// solid icons
import {
	faBold,
	faStrikethrough,
	faItalic,
	faUnderline,
	faAlignLeft,
	faAlignCenter,
	faAlignRight,
	faAlignJustify,
	faRotateLeft,
	faRotateRight,
} from '@fortawesome/free-solid-svg-icons';

// add fonts to library
library.add(
	faBold,
	faStrikethrough,
	faItalic,
	faUnderline,
	faAlignLeft,
	faAlignRight,
	faAlignCenter,
	faAlignJustify,
	faRotateLeft,
	faRotateRight
);

// Change text
function onChange(state) {
	state.read(() => {
		const root = $getRoot();
		const selection = $getSelection();
	});
}

// Editor object
export const Editor = () => {
	// config object
	const initialConfig = {};

	return (
		<div className='rte-field relative rounded-sm shadow-sm border border-gray-200'>
			{/* Lexical object with populated config object */}
			<LexicalComposer
				initialConfig={{
					theme: {
						paragraph: 'mb-1',
						rtl: 'text-right',
						ltr: 'text-left',
						text: {
							bold: 'font-bold',
							italic: 'italic',
							underline: 'underline',
							strikethrough: 'line-through',
						},
					},

					// If error
					onError(error) {
						throw error;
					},
				}}
			>
				{/* Toolbar with loaded Editor */}
				<Toolbar editor={Editor} />

				{/* Format of editor, rich text plugin has more functionality than plain text plugin */}
				<RichTextPlugin
					// content space text space
					contentEditable={
						<ContentEditable className='min-h-[450px] outline-none py-[15px] px-2.5 resize-none overflow-hidden text-ellipsis' />
					}
				/>

				{/* on change set with onChange function */}
				<OnChangePlugin onChange={onChange} />

				{/* Allow undo and redo */}
				<HistoryPlugin />
			</LexicalComposer>
		</div>
	);
};

const Toolbar = () => {
	// states
	const [editor] = useLexicalComposerContext();

	// css states
	const [isBold, setIsBold] = React.useState(false);
	const [isItalic, setIsItalic] = React.useState(false);
	const [isStrikethrough, setIsStrikethrough] = React.useState(false);
	const [isUnderline, setIsUnderline] = React.useState(false);

	const updateToolbar = React.useCallback(() => {
		const selection = $getSelection();

		if ($isRangeSelection(selection)) {
			// set css states
			setIsBold(selection.hasFormat('bold'));
			setIsItalic(selection.hasFormat('italic'));
			setIsStrikethrough(selection.hasFormat('strikethrough'));
			setIsUnderline(selection.hasFormat('underline'));
		}
	}, [editor]);

	React.useEffect(() => {
		return mergeRegister(
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					updateToolbar();
				});
			})
		);
	}, [updateToolbar, editor]);

	// buttons in rte
	return (
		<div className='fixed z-20 shadow bottom-8 left-1/2 transform -translate-x-1/2 min-w-52 h-10 px-2 py-2 bg-[#1b2733] mb-4 space-x-2 flex items-center'>
			{/* bold button */}
			<button
				className='rte-button'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
				}}
			>
				{/* <i className="fa-solid fa-paper-plane"></i> */}
				<i className='fa-solid fa-bold'></i>
			</button>

			{/* strikethrough */}
			<button
				className='rte-button'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
				}}
			>
				<i className='fa-solid fa-strikethrough'></i>
			</button>

			{/* italic */}
			<button
				className='rte-button'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
				}}
			>
				<i className='fa-solid fa-italic'></i>
			</button>

			{/* underline */}
			<button
				className='rte-button'
				onClick={() => {
					editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
				}}
			>
				<i className='fa-solid fa-underline'></i>
			</button>

			<span className='w-[1px] bg-gray-600 block h-full'></span>

			{/* <span className="w-[1px] bg-gray-600 block h-full"></span> */}

			{/* undo */}
			<button
				className='rte-button'
				onClick={() => {
					editor.dispatchCommand(UNDO_COMMAND);
				}}
			>
				<i className='fa-solid fa-rotate-left'></i>
			</button>

			{/* redo */}
			<button
				className='rte-button'
				onClick={() => {
					editor.dispatchCommand(REDO_COMMAND);
				}}
			>
				<i className='fa-solid fa-rotate-right'></i>
			</button>
		</div>
	);
};
