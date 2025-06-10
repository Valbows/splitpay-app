# Lessons Learned: SplitPay APP

## Errors, Solutions, and Reusable Patterns

### Issue: `replace_in_file` SEARCH block mismatch after successful edit

*   **Problem:** When using `replace_in_file` with multiple SEARCH/REPLACE blocks or in sequence, a successful edit can change the file content, causing subsequent SEARCH blocks based on the old content to fail.
*   **Solution:** After any successful `replace_in_file` or `write_to_file` operation, always use the `final_file_content` provided in the tool result as the basis for subsequent SEARCH blocks. If making multiple changes to the same file, consider breaking them into smaller `replace_in_file` calls and re-reading the file (or using the `final_file_content`) between each call if the changes are close together or might affect the surrounding lines.
*   **Lesson:** File content can change unexpectedly due to auto-formatting or previous edits. Always work with the most up-to-date version of the file content when using `replace_in_file`.
